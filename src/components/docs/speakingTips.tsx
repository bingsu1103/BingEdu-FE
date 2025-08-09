import { Link } from "react-router-dom";
import {
  Clock,
  User,
  MessageCircle,
  Mic,
  Volume2,
  CheckCircle,
} from "lucide-react";
import { speakingTipsData } from "@/components/data/speaking.data";

const SpeakingTips = () => {
  return (
    <div className="space-y-8 p-10">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">Speaking Skills</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground">
          Improve Your Speaking Confidence
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transform your speaking abilities with expert tips and proven
          techniques. Build confidence, improve pronunciation, and engage in
          meaningful conversations.
        </p>
      </div>

      {/* Tips Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {speakingTipsData.map((tip) => (
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
              <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
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

              <h2 className="text-xl font-bold text-black group-hover:text-green-600 transition-colors duration-200">
                {tip.title}
              </h2>

              <p className="text-gray-600 leading-relaxed">{tip.excerpt}</p>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Mic className="w-4 h-4 text-green-600" />
                  <span>Practice Points:</span>
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
                to={`/speaking/tips/${tip.id}`}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
              >
                <span>Start Practicing</span>
                <Volume2 className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Interactive Practice Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
        <div className="text-center space-y-6 text-black">
          <h3 className="text-2xl font-bold">Practice Speaking Daily</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Consistency is key to improving your speaking skills. Set aside time
            each day to practice with our interactive exercises and AI-powered
            feedback.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2">
              <Mic className="w-4 h-4" />
              <span>Start Voice Practice</span>
            </button>
            <button className="bg-white cursor-pointer text-green-600 border border-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors duration-200 font-medium">
              Join Speaking Groups
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakingTips;
