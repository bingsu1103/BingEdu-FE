import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  User,
  BookOpen,
  MessageCircle,
  PenTool,
  Target,
  CheckCircle,
  Play,
} from "lucide-react";
import { readingTipsData } from "@/components/data/reading.data";
import { speakingTipsData } from "@/components/data/speaking.data";
import { writingTipsData } from "@/components/data/writing.data";

interface BlogPostProps {
  type: "reading" | "speaking" | "writing";
}

const BlogPost: React.FC<BlogPostProps> = ({ type }) => {
  const { id } = useParams<{ id: string }>();

  const getData = () => {
    switch (type) {
      case "reading":
        return readingTipsData;
      case "speaking":
        return speakingTipsData;
      case "writing":
        return writingTipsData;
      default:
        return [];
    }
  };

  const getConfig = () => {
    switch (type) {
      case "reading":
        return {
          icon: BookOpen,
          color: "blue",
          backPath: "/reading/tips",
          label: "Reading Skills",
        };
      case "speaking":
        return {
          icon: MessageCircle,
          color: "green",
          backPath: "/speaking/tips",
          label: "Speaking Skills",
        };
      case "writing":
        return {
          icon: PenTool,
          color: "purple",
          backPath: "/writing/tips",
          label: "Writing Skills",
        };
      default:
        return {
          icon: BookOpen,
          color: "blue",
          backPath: "/",
          label: "Skills",
        };
    }
  };

  const data = getData();
  const config = getConfig();
  const Icon = config.icon;

  const post = data.find((item) => item.id === parseInt(id || "0"));

  if (!post) {
    return <Navigate to={config.backPath} replace />;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "Advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-10">
      {/* Back Navigation */}
      <Link
        to={config.backPath}
        className="inline-flex items-center space-x-2 text-foreground hover:text-blue-400 transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to {config.label}</span>
      </Link>

      {/* Article Header */}
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div
            className={`inline-flex items-center space-x-2 bg-${config.color}-100 text-${config.color}-700 px-4 py-2 rounded-full`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{config.label}</span>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
              post.difficulty
            )}`}
          >
            {post.difficulty}
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center space-x-6 text-foreground">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
          <span>{post.date}</span>
        </div>

        <p className="text-xl text-foreground leading-relaxed">
          {post.excerpt}
        </p>
      </div>

      {/* Featured Image */}
      <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-96 object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <div
          className="text-foreground leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* Key Points Section */}
      <div className="bg-gray-50 rounded-xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Target className={`w-6 h-6 text-${config.color}-600`} />
          <h3 className="text-2xl font-bold text-black">Key Takeaways</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {post.keyPoints.map((point, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Exercises */}
      <div className={`bg-${config.color}-50 rounded-xl p-8`}>
        <div className="flex items-center space-x-3 mb-6">
          <Play className={`w-6 h-6 text-${config.color}-600`} />
          <h3 className="text-2xl font-bold text-black">Practice Exercises</h3>
        </div>
        <div className="space-y-4">
          {post.practiceExercises.map((exercise, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-4 bg-white rounded-lg"
            >
              <div
                className={`w-8 h-8 bg-${config.color}-100 text-${config.color}-700 rounded-full flex items-center justify-center font-semibold text-sm`}
              >
                {index + 1}
              </div>
              <span className="text-gray-700 flex-1">{exercise}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Related Articles */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-2xl font-bold text-foreground mb-6">
          Continue Learning
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {data
            .filter((item) => item.id !== post.id)
            .slice(0, 2)
            .map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={`${config.backPath}/${relatedPost.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h4
                      className={`font-semibold text-foreground group-hover:text-${config.color}-600 transition-colors duration-200 mb-2`}
                    >
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className={`bg-background rounded-2xl p-8 text-center`}>
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Ready to Practice?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Put these techniques into practice with our interactive exercises and
          personalized feedback system.
        </p>
        <button
          className={`bg-${config.color}-600 text-white px-8 py-3 rounded-lg hover:bg-${config.color}-700 transition-colors duration-200 font-medium`}
        >
          Start Practicing Now
        </button>
      </div>
    </div>
  );
};

export default BlogPost;
