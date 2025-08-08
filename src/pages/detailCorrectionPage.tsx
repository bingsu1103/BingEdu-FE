import React, { useState } from "react";
import {
  Crown,
  CheckCircle2,
  Lock,
  BookOpen,
  AlertCircle,
  ArrowLeft,
  Award,
  Target,
} from "lucide-react";

interface IQuestion {
  lesson: {
    id: string;
    level: string;
  };
  question_type: string;
  question_text: string;
  imageUrl: string;
  audioUrl: string;
  options?: {
    [key: string]: string;
  };
  correct_answer_key?: string;
  correct_answer_text?: string;
  _id: string;
  explanation: string;
}

// Sample data
const sampleQuestions: IQuestion[] = [
  {
    lesson: { id: "lesson-001", level: "Intermediate" },
    question_type: "multiple_choice",
    question_text: "Choose the correct form: She ____ to the store every day.",
    imageUrl: "",
    audioUrl: "",
    options: {
      A: "go",
      B: "goes",
      C: "going",
      D: "gone",
    },
    correct_answer_key: "B",
    _id: "q001",
    explanation:
      "The correct answer is 'goes' because with third person singular (she/he/it), we add 's' to the verb in simple present tense. The sentence describes a habitual action (every day), so we use simple present tense.",
  },
  {
    lesson: { id: "lesson-002", level: "Advanced" },
    question_type: "multiple_choice",
    question_text: "Which sentence uses the past perfect correctly?",
    imageUrl: "",
    audioUrl: "",
    options: {
      A: "I have finished my homework before she arrived.",
      B: "I had finished my homework before she arrived.",
      C: "I finished my homework before she had arrived.",
      D: "I was finishing my homework before she arrived.",
    },
    correct_answer_key: "B",
    _id: "q002",
    explanation:
      "Past perfect (had + past participle) is used to show that one action happened before another action in the past. 'I had finished' happened before 'she arrived'. This shows the sequence of past events clearly.",
  },
];

const CorrectionPage: React.FC = () => {
  const [isVip, setIsVip] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(
    null
  );

  const VipAccessGate = () => (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="bg-background rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-100">
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <Lock className="w-4 h-4 text-yellow-800" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-3">
          VIP Access Required
        </h2>
        <p className="text-foreground mb-6 leading-relaxed">
          This premium content is exclusively available to VIP members. Get
          detailed explanations and correct answers to boost your English
          skills.
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-center text-sm text-foreground">
            <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
            Detailed explanations
          </div>
          <div className="flex items-center justify-center text-sm text-foreground">
            <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
            Step-by-step solutions
          </div>
          <div className="flex items-center justify-center text-sm text-foreground">
            <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
            Advanced learning insights
          </div>
        </div>

        <button
          onClick={() => setIsVip(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
        >
          <Crown className="w-5 h-5 inline mr-2" />
          Simulate VIP Access
        </button>
      </div>
    </div>
  );

  const QuestionDetail = ({ question }: { question: IQuestion }) => (
    <div className="bg-background rounded-2xl shadow-xl p-8 mb-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Question Analysis</h3>
            <p className="text-sm text-foreground">
              Level: {question.lesson.level}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Question */}
        <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500">
          <h4 className="font-medium text-foreground mb-2 flex items-center">
            <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
            Question
          </h4>
          <p className="text-foreground leading-relaxed text-lg">
            {question.question_text}
          </p>
        </div>

        {/* Options */}
        {question.options && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-orange-500" />
              Answer Options
            </h4>
            <div className="grid gap-3 sm:grid-cols-1">
              {Object.entries(question.options).map(([key, value]) => (
                <div
                  key={key}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    key === question.correct_answer_key
                      ? "bg-green-50 border-green-300 shadow-md ring-2 ring-green-200"
                      : "bg-gray-50 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        key === question.correct_answer_key
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {key}
                    </div>
                    <span
                      className={`flex-1 ${
                        key === question.correct_answer_key
                          ? "text-green-800 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {value}
                    </span>
                    {key === question.correct_answer_key && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Correct Answer Badge */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Award className="w-5 h-5" />
            <span className="font-semibold">Correct Answer</span>
          </div>
          <p className="font-medium text-lg">
            {question.correct_answer_key}:{" "}
            {question.options?.[question.correct_answer_key || ""]}
          </p>
        </div>

        {/* Explanation */}
        <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-400">
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Detailed Explanation
          </h4>
          <p className="text-blue-700 leading-relaxed">
            {question.explanation}
          </p>
        </div>
      </div>
    </div>
  );

  const VipContent = () => (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsVip(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    VIP Answer Analysis
                  </h1>
                  <p className="text-sm text-foreground">
                    Detailed solutions and explanations
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full">
              <Crown className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">
                VIP Member
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {selectedQuestion ? (
          <div>
            <button
              onClick={() => setSelectedQuestion(null)}
              className="mb-6 flex items-center text-foreground hover:text-foreground transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to all questions
            </button>
            <QuestionDetail question={selectedQuestion} />
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Question Analysis Hub
              </h2>
              <p className="text-foreground max-w-2xl mx-auto">
                Access detailed explanations and correct answers for all
                practice questions. Master English concepts with our
                comprehensive analysis.
              </p>
            </div>

            <div className="space-y-6">
              {sampleQuestions.map((question) => (
                <div key={question._id}>
                  <QuestionDetail question={question} />
                </div>
              ))}
            </div>

            {/* Back to Home Button */}
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg">
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (!isVip) {
    return <VipAccessGate />;
  }

  return <VipContent />;
};

export default CorrectionPage;
