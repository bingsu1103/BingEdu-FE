import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Star,
  Clock,
  Users,
  TrendingUp,
  BookOpen,
  Headphones,
  FileText,
  Award,
  Search,
  Filter,
  Bell,
  User,
  MoreHorizontal,
  Send,
  PenTool,
  BookMarked,
} from "lucide-react";

interface HomePageProps {
  onCourseSelect: (course: ICourses) => void;
}
const reviewsFromApi: IReview[] = [
  {
    _id: "688b7e993061eaf427b7ed26",
    userID: "6889e6506130e10fa2892e7d",
    userName: "testReview",
    lessonID: "687894cbafe51425c209675f",
    rating: 5,
    comment: "OKOKOKOK",
    createdAt: "2025-07-31T14:32:57.791Z",
    updatedAt: "2025-07-31T14:32:57.791Z",
  },
  {
    _id: "688b7f5dcf9e302cf6d61279",
    userID: "6885d18a7ffea5c59b4d3a48",
    userName: "testReview",
    lessonID: "687894cbafe51425c209675f",
    rating: 5,
    comment: "OKOKOKOK",
    createdAt: "2025-07-31T14:36:13.776Z",
    updatedAt: "2025-07-31T14:36:13.776Z",
  },
];

const mockCourseFeeds: any[] = [
  {
    _id: "feed1",
    course: {
      _id: "6875f0947912353f1cd0edf1",
      title: "IELTS LEVEL A - Complete Listening Course",
      description:
        "Master IELTS listening with comprehensive practice tests and proven strategies. This course covers all question types and provides detailed feedback to help you achieve your target score.",
      thumbnail: "listening-course",
      type: "listening",
    },
    instructor: {
      name: "Sarah Johnson",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      verified: true,
    },
    stats: {
      likes: 234,
      comments: 45,
      shares: 12,
      enrolled: 1250,
      averageRating: 4.8,
      totalReviews: 189,
    },
    tags: ["IELTS", "Listening", "Test Prep", "Beginner"],
    createdAt: "2024-01-15T10:30:00Z",
    isLiked: false,
    isBookmarked: true,
  },
  {
    _id: "feed2",
    course: {
      _id: "687894b840ca534aca183c13",
      title: "Advanced Reading Comprehension",
      description:
        "Develop critical reading skills with advanced techniques for academic and professional texts. Perfect for students preparing for standardized tests or improving comprehension.",
      thumbnail: "reading-course",
      type: "reading",
    },
    instructor: {
      name: "Dr. Michael Chen",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      verified: true,
    },
    stats: {
      likes: 189,
      comments: 32,
      shares: 8,
      enrolled: 890,
      averageRating: 4.6,
      totalReviews: 156,
    },
    tags: ["Reading", "Academic", "Advanced", "Critical Thinking"],
    createdAt: "2024-01-14T14:20:00Z",
    isLiked: true,
    isBookmarked: false,
  },
  {
    _id: "feed3",
    course: {
      _id: "687f320cd4e2347c3bd88dc7",
      title: "Business English Communication",
      description:
        "Excel in professional communication with practical speaking exercises, presentation skills, and business vocabulary. Ideal for career advancement.",
      thumbnail: "speaking-course",
      type: "writing",
    },
    instructor: {
      name: "Emma Williams",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      verified: true,
    },
    stats: {
      likes: 312,
      comments: 67,
      shares: 23,
      enrolled: 2100,
      averageRating: 4.9,
      totalReviews: 234,
    },
    tags: ["Business", "Writing", "Professional", "Communication"],
    createdAt: "2024-01-13T09:15:00Z",
    isLiked: true,
    isBookmarked: true,
  },
  {
    _id: "feed4",
    course: {
      _id: "688a359d9dd2afde47393548",
      title: "Grammar Fundamentals",
      description:
        "Build a strong foundation in English grammar with clear explanations, practical exercises, and real-world examples. Perfect for beginners and intermediate learners.",
      thumbnail: "grammar-course",
      type: "grammar",
    },
    instructor: {
      name: "Prof. David Lee",
      avatar:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      verified: true,
    },
    stats: {
      likes: 156,
      comments: 28,
      shares: 15,
      enrolled: 750,
      averageRating: 4.7,
      totalReviews: 98,
    },
    tags: ["Grammar", "Fundamentals", "Beginner", "Structure"],
    createdAt: "2024-01-12T16:45:00Z",
    isLiked: false,
    isBookmarked: false,
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "listening":
      return <Headphones className="w-5 h-5" />;
    case "reading":
      return <BookOpen className="w-5 h-5" />;
    case "writing":
      return <PenTool className="w-5 h-5" />;
    case "grammar":
      return <BookMarked className="w-5 h-5" />;
    case "mixed":
      return <FileText className="w-5 h-5" />;
    default:
      return <BookOpen className="w-5 h-5" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "listening":
      return "from-blue-500 to-blue-600";
    case "reading":
      return "from-green-500 to-green-600";
    case "writing":
      return "from-purple-500 to-purple-600";
    case "grammar":
      return "from-orange-500 to-orange-600";
    case "mixed":
      return "from-pink-500 to-pink-600";
    default:
      return "from-gray-500 to-gray-600";
  }
};

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return date.toLocaleDateString();
};

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={`w-4 h-4 ${
        index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
      }`}
    />
  ));
};

export default function HomePage({ onCourseSelect }: HomePageProps) {
  const [selectedFeed, setSelectedFeed] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredFeeds = mockCourseFeeds.filter((feed) => {
    const matchesSearch =
      feed.course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feed.course.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      feed.tags.some((tag: any) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilter =
      selectedFilter === "all" || feed.course.type === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const handleLike = (feedId: string) => {
    // Handle like functionality
    console.log("Liked feed:", feedId);
  };

  const handleBookmark = (feedId: string) => {
    // Handle bookmark functionality
    console.log("Bookmarked feed:", feedId);
  };

  const handleShare = (feedId: string) => {
    // Handle share functionality
    console.log("Shared feed:", feedId);
  };

  const handleSubmitReview = (courseId: string) => {
    if (newComment.trim()) {
      // Handle submit review
      console.log("New review:", {
        courseId,
        rating: newRating,
        comment: newComment,
      });
      setNewComment("");
      setNewRating(5);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* Filter Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filter by Type
              </h3>
              <div className="space-y-2">
                {[
                  "all",
                  "listening",
                  "reading",
                  "writing",
                  "grammar",
                  "mixed",
                ].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedFilter(type)}
                    className={`w-full text-left px-4 py-2 rounded-xl transition-colors ${
                      selectedFilter === type
                        ? "bg-indigo-100 text-indigo-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center">
                      {type !== "all" && getTypeIcon(type)}
                      <span className={type !== "all" ? "ml-2" : ""}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Trending Topics
              </h3>
              <div className="space-y-3">
                {[
                  "IELTS Preparation",
                  "Business English",
                  "Academic Writing",
                  "Grammar Basics",
                  "Listening Skills",
                ].map((topic, index) => (
                  <div
                    key={topic}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-600">{topic}</span>
                    <span className="text-sm text-indigo-600 font-medium">
                      #{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Your Progress
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Courses Completed</span>
                  <span className="font-semibold text-green-600">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Hours Learned</span>
                  <span className="font-semibold text-blue-600">48h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="font-semibold text-orange-600">7 days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="flex-1 space-y-6">
            {filteredFeeds.map((feed) => (
              <div
                key={feed._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Feed Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={feed.instructor.avatar}
                        alt={feed.instructor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-800">
                            {feed.instructor.name}
                          </h4>
                          {feed.instructor.verified && (
                            <Award className="w-4 h-4 text-blue-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {formatTimeAgo(feed.createdAt)}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${getTypeColor(
                        feed.course.type
                      )} rounded-2xl flex items-center justify-center text-white flex-shrink-0`}
                    >
                      {getTypeIcon(feed.course.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {feed.course.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {feed.course.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {feed.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Course Stats */}
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>
                            {feed.stats.enrolled.toLocaleString()} enrolled
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {renderStars(Math.floor(feed.stats.averageRating))}
                          <span className="ml-1">
                            {feed.stats.averageRating} (
                            {feed.stats.totalReviews} reviews)
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>~3h duration</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => onCourseSelect(feed.course)}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
                      >
                        Start Learning
                      </button>
                    </div>
                  </div>
                </div>

                {/* Engagement Actions */}
                <div className="px-6 py-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleLike(feed._id)}
                        className={`flex items-center space-x-2 transition-colors ${
                          feed.isLiked
                            ? "text-red-500"
                            : "text-gray-500 hover:text-red-500"
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            feed.isLiked ? "fill-current" : ""
                          }`}
                        />
                        <span>{feed.stats.likes}</span>
                      </button>

                      <button
                        onClick={() =>
                          setSelectedFeed(
                            selectedFeed === feed._id ? null : feed._id
                          )
                        }
                        className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>{feed.stats.comments}</span>
                      </button>

                      <button
                        onClick={() => handleShare(feed._id)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                        <span>{feed.stats.shares}</span>
                      </button>
                    </div>

                    <button
                      onClick={() => handleBookmark(feed._id)}
                      className={`transition-colors ${
                        feed.isBookmarked
                          ? "text-yellow-500"
                          : "text-gray-500 hover:text-yellow-500"
                      }`}
                    >
                      <Bookmark
                        className={`w-5 h-5 ${
                          feed.isBookmarked ? "fill-current" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                {selectedFeed === feed._id && (
                  <div className="border-t border-gray-100 p-6 bg-gray-50">
                    {/* Add Review Form */}
                    <div className="mb-6 p-4 bg-white rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Write a Review
                      </h4>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-sm text-gray-600">Rating:</span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setNewRating(star)}
                              className={`w-6 h-6 ${
                                star <= newRating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            >
                              <Star className="w-full h-full" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          placeholder="Share your thoughts about this course..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => handleSubmitReview(feed.course._id)}
                          className="px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      {reviewsFromApi?.map((review) => (
                        <div
                          key={review._id}
                          className="bg-white p-4 rounded-xl"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {review.userName?.charAt(0) || "U"}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h5 className="font-semibold text-gray-800">
                                    {review.userName || "Anonymous"}
                                  </h5>
                                  <div className="flex items-center space-x-2">
                                    <div className="flex space-x-1">
                                      {renderStars(review.rating)}
                                    </div>
                                    <span className="text-sm text-gray-500">
                                      {formatTimeAgo(review.createdAt!)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {review.comment && (
                                <p className="text-gray-700">
                                  {review.comment}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {filteredFeeds.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No courses found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
