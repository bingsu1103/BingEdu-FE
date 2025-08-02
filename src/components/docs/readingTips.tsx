import { Link } from "react-router-dom";
import {
  Clock,
  User,
  BookOpen,
  Target,
  Lightbulb,
  CheckCircle,
} from "lucide-react";
import { readingTipsData } from "@/components/data/reading.data";

const ReadingTips = () => {
  return (
    <div className="space-y-8 p-10">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
          <BookOpen className="w-5 h-5" />
          <span className="font-medium">Reading Skills</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground">
          Master Your Reading Skills
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover proven strategies and techniques to improve your reading
          comprehension, speed, and retention. Start your journey to becoming a
          more effective reader today.
        </p>
      </div>

      {/* Tips Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {readingTipsData.map((tip) => (
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
              <div className="absolute top-4 right-4 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
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

              <h2 className="text-xl font-bold text-foreground group-hover:text-blue-600 transition-colors duration-200">
                {tip.title}
              </h2>

              <p className="text-gray-600 leading-relaxed">{tip.excerpt}</p>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span>Key Strategies:</span>
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
                to={`/reading/tips/${tip.id}`}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
              >
                <span>Read Full Article</span>
                <Lightbulb className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-background rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Ready to Level Up Your Reading?
        </h3>
        <p className="text-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of learners who have improved their reading skills with
          our comprehensive courses and personalized feedback.
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
          Start Learning Today
        </button>
      </div>
    </div>
  );
};

export default ReadingTips;
