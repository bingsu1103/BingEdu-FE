import { useState, useEffect } from "react";
import { Clock, FileText, User, CheckCircle } from "lucide-react";
import questionService from "@/services/question.service";

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

const TestPage: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [timeLeft, setTimeLeft] = useState(1800);
  const [isFinished, setIsFinished] = useState(false);
  const [listQuestion, setListQuestion] = useState([]);
  const lessonId = "687894cbafe51425c209675f";

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsFinished(true);
    }
  }, [timeLeft, isFinished]);

  useEffect(() => {
    const getQuestion = async () => {
      const questionRes = await questionService.getQuestionByLessonIdAPI(
        lessonId
      );
      const listQuestionRes = questionRes.data;
      setListQuestion(listQuestionRes);
    };
    getQuestion();
  }, []);

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    });
  };

  const handleSubmit = () => {
    setIsFinished(true);
  };

  const answeredQuestions = Object.keys(selectedAnswers).length;
  const progressPercentage = (answeredQuestions / listQuestion.length) * 100;

  if (isFinished) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-background rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Test Completed!
          </h2>
          <p className="text-foreground mb-4">
            You answered {answeredQuestions} out of {listQuestion.length}{" "}
            questions.
          </p>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-blue-800 font-medium">
              Time used: {formatTime(1800 - timeLeft)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-blue-500" />
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  English Test
                </h1>
                <p className="text-sm text-foreground">
                  {listQuestion.length} Questions
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-foreground">
                  {answeredQuestions}/{listQuestion.length}
                </span>
              </div>

              <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5 text-red-500" />
                <span className="text-lg font-mono font-bold text-red-600">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs text-foreground mb-1">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {listQuestion.map((question: any, index: number) => (
            <div
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-11">
                {Object.entries(question.options).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => handleAnswerSelect(question._id, key)}
                    className={`text-left p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-sm ${
                      selectedAnswers[question._id] === key
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-gray-200 hover:border-gray-300 bg-background hover:bg-gray-500"
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
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Submit Test</span>
          </button>
        </div>

        <div className="mt-6 bg-background rounded-lg shadow-sm border border-gray-200 p-4">
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
        </div>
      </div>
    </div>
  );
};

export default TestPage;
