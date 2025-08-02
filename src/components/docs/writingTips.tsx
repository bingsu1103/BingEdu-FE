import { Link } from "react-router-dom";
import {
  Clock,
  User,
  PenTool,
  FileText,
  Edit3,
  CheckCircle,
} from "lucide-react";
import { writingTipsData } from "../data/writing.data";

const WritingTips = () => {
  return (
    <div className="space-y-8 p-10">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
          <PenTool className="w-5 h-5" />
          <span className="font-medium">Writing Skills</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground">
          Elevate Your Writing Skills
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          From essays to creative stories, from business emails to academic
          papers - master the art of written communication with our
          comprehensive guides.
        </p>
      </div>

      {/* Tips Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {writingTipsData.map((tip) => (
          <article
            key={tip.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
          >
            <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
              <img
                src={tip.image}
                alt={tip.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Clock className="w-3 h-3" />
                  <span>{tip.readTime}</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                {tip.difficulty}
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>{tip.author}</span>
                </div>
                <span>•</span>
                <span>{tip.date}</span>
              </div>

              <h2 className="text-xl font-bold text-foreground group-hover:text-purple-600 transition-colors duration-200">
                {tip.title}
              </h2>

              <p className="text-gray-600 leading-relaxed">{tip.excerpt}</p>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <FileText className="w-4 h-4 text-purple-600" />
                  <span>Writing Techniques:</span>
                </div>
                <ul className="space-y-2">
                  {tip.keyPoints.slice(0, 3).map((strategy, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-2 text-sm text-gray-600"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{strategy}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={`/writing/tips/${tip.id}`}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
              >
                <span>Practice Writing</span>
                <Edit3 className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Writing Challenge Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold text-black">
            Daily Writing Challenges
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Improve your writing skills with our daily prompts and exercises.
            Get personalized feedback from expert instructors and track your
            progress over time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <h4 className="font-semibold text-black mb-2">Today's Prompt</h4>
              <p className="text-sm text-gray-600">
                "Write about a moment that changed your perspective..."
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <h4 className="font-semibold text-black mb-2">Grammar Focus</h4>
              <p className="text-sm text-gray-600">
                Practice using conditional sentences in context
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <h4 className="font-semibold text-black mb-2">
                Vocabulary Builder
              </h4>
              <p className="text-sm text-gray-600">
                Incorporate these 5 advanced words in your writing
              </p>
            </div>
          </div>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium">
            Start Today's Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritingTips;
