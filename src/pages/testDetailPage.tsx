import { useState, useEffect } from "react";
import {
  Clock,
  FileText,
  MessageCircleQuestionMark,
  CheckCircle,
  Crown,
  CircleArrowLeft,
  Loader2,
} from "lucide-react";
import questionService from "@/services/question.service";
import { useTheme } from "@/components/context/theme.context";
import { Link, useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { useCurrentApp } from "@/components/context/app.context";
import answerService from "@/services/answer.service";
import progressService from "@/services/progress.service";
import submissionService from "@/services/submission.service";
import { useTestGuard } from "@/components/context/testGuard.context";
import aiService from "@/services/ai.service";
import { Skeleton } from "@/components/ui/skeleton";

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

const TestDetailPage: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [timeLeft, setTimeLeft] = useState(1800);
  const [isFinished, setIsFinished] = useState(false);
  const [listQuestion, setListQuestion] = useState<IQuestion[] | null>(null);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { setIsDoingTest } = useTestGuard();
  const navigate = useNavigate();
  const { lessonId } = useParams<{ lessonId: string }>();
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const { user } = useCurrentApp();

  useEffect(() => {
    if (
      listQuestion &&
      listQuestion.length > 0 &&
      timeLeft > 0 &&
      !isFinished &&
      !loading
    ) {
      const timer = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && !isFinished) {
      setIsFinished(true);
    }
  }, [listQuestion, timeLeft, isFinished, loading]);

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const questionRes = await questionService.getQuestionByLessonIdAPI(
          lessonId!
        );
        const listQuestionRes = questionRes.data || [];
        const validatedQuestions = Array.isArray(listQuestionRes)
          ? listQuestionRes.map((q) => ({
              ...q,
              options: q.options || {}, // đảm bảo luôn có object
            }))
          : [];
        setListQuestion(validatedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setListQuestion([]);
      }
    };
    getQuestion();
  }, [lessonId]);

  useEffect(() => {
    if (!isFinished) {
      setIsDoingTest(true);
    } else {
      setIsDoingTest(false);
    }
    return () => setIsDoingTest(false);
  }, [isFinished, setIsDoingTest]);

  const handleAnswerSelect = (questionId: string, answer: string) => {
    if (loading) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleEssayAnswer = (questionId: string, value: string) => {
    if (loading) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const answersToSubmit: IAnswerPost[] = (listQuestion ?? []).map(
      (question) => {
        const userAnswer = selectedAnswers[question._id];
        return {
          user_id: user?._id || "",
          lesson_id: lessonId || "",
          question_id: question._id,
          question_type: question.question_type as "multiple_choice" | "essay",
          ...(question.question_type === "multiple_choice" && {
            user_answer_key: userAnswer !== undefined ? userAnswer : undefined,
          }),
          ...(question.question_type === "essay" && {
            user_answer_text: userAnswer !== undefined ? userAnswer : undefined,
          }),
        };
      }
    );

    try {
      const answerRes = await answerService.createMultipleAnswerAPI(
        answersToSubmit
      );
      const result = answerRes.data || [];

      const aiReply = await aiService.getMarkFromAI(listQuestion ?? [], result);

      let score: number =
        aiReply.data?.reduce(
          (acc, curr) =>
            acc +
            (typeof curr === "number"
              ? curr
              : curr && typeof curr.score === "number"
              ? curr.score
              : 0),
          0
        ) || 0;

      result.forEach((data: IAnswer) => {
        score += data?.score || 0;
      });

      await submissionService.createSubmissionAPI(
        user?._id || "",
        lessonId || "",
        score
      );

      const progressCourse = await progressService.getCourseProgressAPI(
        user?._id || "",
        id || ""
      );
      if (!progressCourse.status) {
        await progressService.createCourseProgressAPI(
          user?._id || "",
          lessonId || "",
          id || ""
        );
      } else {
        if (!progressCourse.data?.lessonsIdComplete.includes(`${lessonId}`)) {
          await progressService.updateCourseProgressAPI(
            user?._id || "",
            lessonId || "",
            id || ""
          );
        }
      }

      setTotalScore(score);
      setIsFinished(true);
    } catch (error) {
      console.error("Error submitting answers:", error);
      setTotalScore(0);
      setIsFinished(true);
    } finally {
      setLoading(false);
    }
  };

  const answeredQuestions = Object.keys(selectedAnswers).length;

  const scrollToQuestion = (questionId: string) => {
    const element = document.getElementById(`question-${questionId}`);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // ======= FINISH VIEW =======
  if (isFinished) {
    return (
      <div className="flex-1 bg-background flex items-center justify-center p-4">
        <div className="bg-background rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Lesson Completed!
          </h2>
          <p className="text-foreground mb-4">
            You answered {answeredQuestions} out of{" "}
            {(listQuestion ?? []).length} questions.
          </p>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-blue-800 font-medium">
              Time used: {formatTime(1800 - timeLeft)}
            </p>
            <span className="text-red-500 font-bold">
              Score: {totalScore} / {(listQuestion ?? []).length}
            </span>
          </div>

          {user?.type === "vip" ? (
            <div className="mt-10">
              <Button className="cursor-pointer">Viewing Corrections</Button>
            </div>
          ) : (
            <div className="mt-10 space-y-3">
              <Button
                onClick={() => navigate("/checkout")}
                variant="outline"
                className="cursor-pointer"
              >
                <Crown className="mr-2" />
                Upgrade to VIP to view corrections
              </Button>
              <Button className="cursor-pointer">
                <CircleArrowLeft className="mr-2" />
                <Link to="/">Back home</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ======= TEST VIEW =======
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-background shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-blue-500" />
              <div>
                {!listQuestion ? (
                  <>
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-4 w-28" />
                  </>
                ) : (
                  <>
                    <h1 className="text-xl font-bold text-foreground">
                      English Test
                    </h1>
                    <p className="text-sm text-foreground">
                      {listQuestion.length} Questions
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                {!listQuestion ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  <>
                    <MessageCircleQuestionMark className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-foreground">
                      {answeredQuestions}/{listQuestion.length}
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5 text-red-500" />
                <span className="text-lg font-mono font-bold text-red-600">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>

          {/* Question List nav */}
          <div className="mt-4 bg-background lg:absolute md:top-20 md:left-10">
            <div className="text-sm font-bold text-foreground mb-2">
              Question List
            </div>
            {!listQuestion ? (
              <div className="grid max-sm:grid-cols-10 sm:grid-cols-5 gap-2 p-2 rounded-lg border border-gray-200">
                {Array.from({ length: 20 }).map((_, i) => (
                  <Skeleton key={i} className="w-8 h-8 rounded-full" />
                ))}
              </div>
            ) : (
              <div className="max-lg:w-[50%] max-sm:w-full max-lg:m-auto grid max-sm:grid-cols-10 sm:grid-cols-5 gap-2 p-2 rounded-lg border border-gray-200">
                {listQuestion.map((question: IQuestion, index: number) => (
                  <button
                    key={question._id}
                    onClick={() => scrollToQuestion(question._id)}
                    disabled={loading}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                      selectedAnswers[question._id]
                        ? "bg-green-100 text-green-600 hover:bg-green-200"
                        : "bg-background text-foreground hover:bg-gray-400"
                    } ${theme === "dark" && "border border-white"}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {!listQuestion ? (
          // ===== Skeleton cho danh sách câu hỏi =====
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-background rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start space-x-3 mb-6">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-11">
                  <Skeleton className="h-12 w-full rounded-lg" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {listQuestion.map((question: IQuestion, index: number) => (
              <div
                id={`question-${question._id}`}
                key={question._id}
                className="bg-background rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start space-x-3 mb-6">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-foreground leading-relaxed">
                      {question.question_text}
                    </h3>
                  </div>
                  {selectedAnswers[question._id] && (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  )}
                </div>

                {question.imageUrl && (
                  <div className="flex justify-center pb-10">
                    {/* có thể thêm skeleton hình nếu muốn trước khi load ảnh */}
                    <img src={question.imageUrl} alt="" />
                  </div>
                )}

                {question.audioUrl && (
                  <div className="w-full mb-6 bg-gray-100 rounded-lg shadow-md">
                    <audio
                      className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      controls
                    >
                      <source src={question.audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}

                {question.question_type === "essay" ? (
                  <textarea
                    value={selectedAnswers[question._id] || ""}
                    onChange={(e) =>
                      handleEssayAnswer(question._id, e.target.value)
                    }
                    disabled={loading}
                    className="resize-none w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground bg-background"
                    placeholder="Write your answer here..."
                    rows={5}
                  />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-11">
                    {question.options &&
                      Object.entries(question.options).map(([key, value]) => (
                        <button
                          key={key}
                          onClick={() => handleAnswerSelect(question._id, key)}
                          disabled={loading}
                          className={`text-left p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-sm ${
                            selectedAnswers[question._id] === key
                              ? "border-blue-500 bg-blue-50 shadow-sm"
                              : "border-gray-200 hover:border-gray-300 bg-background hover:bg-blue-400"
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <span
                              className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium flex-shrink-0 ${
                                selectedAnswers[question._id] === key
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-100 text-black"
                              }`}
                            >
                              {key}
                            </span>
                            <span
                              className={`text-sm leading-relaxed ${
                                selectedAnswers[question._id] === key
                                  ? "text-blue-500"
                                  : "text-foreground"
                              }`}
                            >
                              {String(value)}
                            </span>
                          </div>
                        </button>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Submit */}
        <div className="mt-8 text-center">
          <Button
            size="lg"
            disabled={loading || !listQuestion}
            onClick={handleSubmit}
            className="inline-flex items-center space-x-2 px-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="w-5 h-5" />
            )}
            {loading ? (
              <span> Waiting for AI to score</span>
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </div>

        {/* Footer stats */}
        <div className="mt-6 bg-background rounded-lg shadow-sm border border-gray-200 p-4">
          {!listQuestion ? (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
              <div className="flex space-x-6">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-4 w-40" />
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
              <div className="flex space-x-6">
                <span className="text-foreground">
                  <span className="font-medium text-foreground">
                    {listQuestion.length}
                  </span>{" "}
                  Total Questions
                </span>
                <span className="text-foreground">
                  <span className="font-medium text-green-600">
                    {answeredQuestions}
                  </span>{" "}
                  Answered
                </span>
                <span className="text-foreground">
                  <span className="font-medium text-orange-600">
                    {listQuestion.length - answeredQuestions}
                  </span>{" "}
                  Remaining
                </span>
              </div>
              <div className="text-foreground">
                Time Remaining:{" "}
                <span className="font-mono font-medium">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestDetailPage;
