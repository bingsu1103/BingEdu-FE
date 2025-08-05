import { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Star,
  Clock,
  Users,
  BookOpen,
  Headphones,
  FileText,
  Award,
  Search,
  Filter,
  MoreHorizontal,
  Send,
  PenTool,
  BookMarked,
  Play,
  ChevronRight,
  Trophy,
  Calendar,
  Briefcase,
  ArrowUp,
  ChevronLeft,
  Siren as Fire,
  Activity,
  BarChart3,
} from "lucide-react";

interface IReview {
  _id: string;
  userID: string;
  userName: string;
  lessonID: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

const reviewsFromApi: IReview[] = [
  {
    _id: "688b7e993061eaf427b7ed26",
    userID: "6889e6506130e10fa2892e7d",
    userName: "Emma Thompson",
    lessonID: "687894cbafe51425c209675f",
    rating: 5,
    comment:
      "This IELTS listening course is absolutely fantastic! The practice tests are very realistic and helped me improve my score significantly.",
    createdAt: "2025-01-15T14:32:57.791Z",
    updatedAt: "2025-01-15T14:32:57.791Z",
  },
  {
    _id: "688b7f5dcf9e302cf6d61279",
    userID: "6885d18a7ffea5c59b4d3a48",
    userName: "Michael Chen",
    lessonID: "687894cbafe51425c209675f",
    rating: 5,
    comment:
      "Excellent course structure and very detailed explanations. The instructor's teaching method is clear and easy to follow.",
    createdAt: "2025-01-14T14:36:13.776Z",
    updatedAt: "2025-01-14T14:36:13.776Z",
  },
];

const mockCourseFeeds: any[] = [
  {
    _id: "feed1",
    course: {
      _id: "6875f0947912353f1cd0edf1",
      title: "IELTS Listening Mastery - Complete Course",
      description:
        "Master IELTS listening with comprehensive practice tests and proven strategies. This course covers all question types and provides detailed feedback to help you achieve your target score.",
      thumbnail:
        "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
      type: "listening",
      level: "Intermediate",
      duration: "12 hours",
      lessonsCount: 24,
    },
    instructor: {
      name: "Sarah Johnson",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      verified: true,
      title: "IELTS Expert & Former Examiner",
    },
    stats: {
      likes: 234,
      comments: 45,
      shares: 12,
      enrolled: 1250,
      averageRating: 4.8,
      totalReviews: 189,
    },
    tags: ["IELTS", "Listening", "Test Prep", "Intermediate"],
    createdAt: "2024-01-15T10:30:00Z",
    isLiked: false,
    isBookmarked: true,
    price: 49.99,
    originalPrice: 79.99,
  },
  {
    _id: "feed2",
    course: {
      _id: "687894b840ca534aca183c13",
      title: "Advanced English Reading Comprehension",
      description:
        "Develop critical reading skills with advanced techniques for academic and professional texts. Perfect for students preparing for standardized tests or improving comprehension.",
      thumbnail:
        "https://images.pexels.com/photos/1181772/pexels-photo-1181772.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
      type: "reading",
      level: "Advanced",
      duration: "8 hours",
      lessonsCount: 16,
    },
    instructor: {
      name: "Dr. Michael Chen",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      verified: true,
      title: "Academic English Specialist",
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
    price: 39.99,
    originalPrice: 59.99,
  },
  {
    _id: "feed3",
    course: {
      _id: "687f320cd4e2347c3bd88dc7",
      title: "Business English Writing Excellence",
      description:
        "Excel in professional communication with practical writing exercises, email templates, and business vocabulary. Ideal for career advancement and workplace success.",
      thumbnail:
        "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
      type: "writing",
      level: "Intermediate",
      duration: "15 hours",
      lessonsCount: 30,
    },
    instructor: {
      name: "Emma Williams",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      verified: true,
      title: "Business Communication Expert",
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
    price: 69.99,
    originalPrice: 99.99,
  },
];

const featuredCourses = [
  {
    id: 1,
    title: "Complete IELTS Preparation Bootcamp",
    instructor: "John Davis",
    image:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    rating: 4.9,
    students: 15420,
    price: 89.99,
    originalPrice: 199.99,
    tag: "Bestseller",
    duration: "42 hours",
  },
  {
    id: 2,
    title: "English Grammar Fundamentals",
    instructor: "Dr. Sarah Kim",
    image:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    rating: 4.8,
    students: 8930,
    price: 79.99,
    originalPrice: 149.99,
    tag: "Hot",
    duration: "28 hours",
  },
  {
    id: 3,
    title: "Business English Communication",
    instructor: "Alex Rodriguez",
    image:
      "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2",
    rating: 4.7,
    students: 12500,
    price: 59.99,
    originalPrice: 119.99,
    tag: "New",
    duration: "35 hours",
  },
];

const categories = [
  {
    name: "IELTS Prep",
    icon: <FileText className="w-8 h-8" />,
    courses: 1250,
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Grammar",
    icon: <PenTool className="w-8 h-8" />,
    courses: 890,
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "Business English",
    icon: <Briefcase className="w-8 h-8" />,
    courses: 650,
    color: "from-green-500 to-green-600",
  },
  {
    name: "Conversation",
    icon: <MessageCircle className="w-8 h-8" />,
    courses: 420,
    color: "from-orange-500 to-orange-600",
  },
  {
    name: "Listening",
    icon: <Headphones className="w-8 h-8" />,
    courses: 330,
    color: "from-pink-500 to-pink-600",
  },
  {
    name: "Writing",
    icon: <BookOpen className="w-8 h-8" />,
    courses: 280,
    color: "from-teal-500 to-teal-600",
  },
];

const topStudents = [
  {
    name: "Jennifer Martinez",
    title: "IELTS Band 8.5 Achiever",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2",
    coursesCompleted: 45,
    studyHours: 320,
    rating: 4.9,
    achievement: "Top Performer",
  },
  {
    name: "Mark Thompson",
    title: "Business English Expert",
    avatar:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2",
    coursesCompleted: 38,
    studyHours: 280,
    rating: 4.8,
    achievement: "Grammar Master",
  },
  {
    name: "Lisa Wang",
    title: "Academic Writing Specialist",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2",
    coursesCompleted: 29,
    studyHours: 250,
    rating: 4.9,
    achievement: "Writing Champion",
  },
];

const liveEvents = [
  {
    id: 1,
    title: "IELTS Speaking Practice Session",
    instructor: "Sarah Chen",
    time: "2:00 PM",
    date: "Today",
    attendees: 245,
    type: "Live Session",
  },
  {
    id: 2,
    title: "Grammar Workshop: Advanced Tenses",
    instructor: "Michael Brown",
    time: "4:30 PM",
    date: "Tomorrow",
    attendees: 180,
    type: "Workshop",
  },
  {
    id: 3,
    title: "Business English Presentation Skills",
    instructor: "Emily Davis",
    time: "10:00 AM",
    date: "Sat, Nov 16",
    attendees: 120,
    type: "Masterclass",
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

export default function HomePage() {
  const [selectedFeed, setSelectedFeed] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [animatedCards, setAnimatedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    const observeCards = () => {
      const cards = document.querySelectorAll(".animate-on-scroll");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setAnimatedCards((prev) => new Set([...prev, entry.target.id]));
            }
          });
        },
        { threshold: 0.1, rootMargin: "50px" }
      );

      cards.forEach((card) => observer.observe(card));
      return () => observer.disconnect();
    };

    window.addEventListener("scroll", handleScroll);
    const cleanup = observeCards();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cleanup();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCourses.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredFeeds = mockCourseFeeds.filter((feed) => {
    const matchesSearch =
      feed.course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feed.course.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      feed.tags.some((tag: any) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilter =
      selectedFilter === "all" || feed.course.type === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen text-foreground relative overflow-hidden">
      {/* Cosmic Background with Animated Stars */}
      <div className="cosmic-background">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star delay-1"></div>
        <div className="shooting-star delay-2"></div>
      </div>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent animate-fade-in-up">
              Master English with Confidence
            </h2>
            <p className="text-xl text-foreground/70 mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
              Join thousands of learners worldwide and achieve your English
              language goals with our comprehensive courses, expert instructors,
              and interactive learning experience.
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-400">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity animate-pulse-glow"></div>
                <div className="relative bg-background/90 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-white/10">
                  <div className="flex items-center">
                    <Search className="w-5 h-5 text-foreground/40 ml-4" />
                    <input
                      type="text"
                      placeholder="What English skill do you want to improve today?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 px-4 py-4 bg-transparent text-foreground placeholder-foreground/50 focus:outline-none"
                    />
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-pulse-glow">
                      Search
                    </button>
                  </div>
                </div>
              </div>

              {/* Trending Tags */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <span className="text-sm text-foreground/60">
                  Popular searches:
                </span>
                {[
                  "IELTS",
                  "Grammar",
                  "Business English",
                  "Speaking",
                  "Writing",
                ].map((tag, index) => (
                  <button
                    key={tag}
                    className="px-3 py-1 bg-background/50 border border-white/20 rounded-full text-sm text-foreground/70 hover:bg-background/70 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                {
                  label: "Active Students",
                  value: "50K+",
                  icon: <Users className="w-6 h-6" />,
                },
                {
                  label: "Expert Teachers",
                  value: "500+",
                  icon: <Award className="w-6 h-6" />,
                },
                {
                  label: "English Courses",
                  value: "1K+",
                  icon: <BookOpen className="w-6 h-6" />,
                },
                {
                  label: "Success Stories",
                  value: "10K+",
                  icon: <Trophy className="w-6 h-6" />,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center group cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${800 + index * 150}ms` }}
                >
                  <div
                    className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 animate-float"
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-foreground animate-counter">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Carousel */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-foreground animate-slide-in-left">
              Featured English Courses
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                className="p-2 rounded-full bg-background/50 border border-white/20 hover:bg-background/70 transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setCurrentSlide(
                    Math.min(featuredCourses.length - 1, currentSlide + 1)
                  )
                }
                className="p-2 rounded-full bg-background/50 border border-white/20 hover:bg-background/70 transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl animate-slide-in-right">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredCourses.map((course) => (
                <div key={course.id} className="w-full flex-shrink-0">
                  <div className="relative h-96 bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-2xl overflow-hidden group cursor-pointer">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full animate-pulse-glow ${
                            course.tag === "Bestseller"
                              ? "bg-yellow-500"
                              : course.tag === "Hot"
                              ? "bg-red-500"
                              : "bg-green-500"
                          }`}
                        >
                          {course.tag}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current animate-twinkle" />
                          <span className="text-sm">{course.rating}</span>
                        </div>
                      </div>
                      <h4 className="text-2xl font-bold mb-2 animate-slide-in-left">
                        {course.title}
                      </h4>
                      <p className="text-white/80 mb-4 animate-slide-in-left animation-delay-200">
                        by {course.instructor}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-white/80">
                          <span className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>
                              {course.students.toLocaleString()} students
                            </span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold animate-bounce-subtle">
                            ${course.price}
                          </div>
                          <div className="text-sm text-white/60 line-through">
                            ${course.originalPrice}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 animate-pulse-glow">
                      <Play className="w-5 h-5 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4 animate-fade-in-up">
              Explore English Skills
            </h3>
            <p className="text-foreground/70 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Master different aspects of English language with our
              comprehensive course categories designed for all proficiency
              levels.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div
                key={category.name}
                id={`category-${index}`}
                className={`animate-on-scroll group cursor-pointer p-6 bg-background/90 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-105 ${
                  animatedCards.has(`category-${index}`)
                    ? "animate-fade-in-up"
                    : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform mx-auto animate-float`}
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  {category.icon}
                </div>
                <h4 className="font-semibold text-foreground text-center mb-2">
                  {category.name}
                </h4>
                <p className="text-sm text-foreground/60 text-center">
                  {category.courses} courses
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Personal Dashboard */}
            <div className="bg-background/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 p-6 animate-slide-in-left">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Your English Journey
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-foreground/70">Learning Streak</span>
                  <div className="flex items-center space-x-1">
                    <Fire className="w-4 h-4 text-orange-500 animate-flicker" />
                    <span className="font-semibold text-orange-400 animate-counter">
                      15 days
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground/70">
                    Courses in Progress
                  </span>
                  <span className="font-semibold text-blue-400 animate-counter">
                    4
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground/70">
                    Certificates Earned
                  </span>
                  <span className="font-semibold text-green-400 animate-counter">
                    12
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground/70">
                    Study Hours This Week
                  </span>
                  <span className="font-semibold text-purple-400 animate-counter">
                    18.5h
                  </span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-white/10 animate-pulse-glow">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-400 animate-bounce-subtle" />
                  <span className="text-sm font-medium text-foreground">
                    Keep going! 2 more days for IELTS Master badge
                  </span>
                </div>
              </div>
            </div>

            {/* Live Events */}
            <div className="bg-background/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 p-6 animate-slide-in-left animation-delay-200">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Live English Sessions
              </h3>
              <div className="space-y-3">
                {liveEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className="p-3 bg-background/30 rounded-xl hover:bg-background/50 transition-all duration-300 cursor-pointer hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full animate-pulse-glow ${
                          event.type === "Live Session"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : event.type === "Workshop"
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : "bg-green-500/20 text-green-400 border border-green-500/30"
                        }`}
                      >
                        {event.type}
                      </span>
                      <span className="text-xs text-foreground/60">
                        {event.attendees} attending
                      </span>
                    </div>
                    <h4 className="font-medium text-foreground text-sm mb-1">
                      {event.title}
                    </h4>
                    <p className="text-xs text-foreground/60">
                      {event.instructor} • {event.date} at {event.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Students */}
            <div className="bg-background/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 p-6 animate-slide-in-left animation-delay-400">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                Top English Students
              </h3>
              <div className="space-y-4">
                {topStudents.map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-background/30 transition-all duration-300 cursor-pointer hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="relative">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover animate-pulse-glow"
                      />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-900">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm truncate">
                        {student.name}
                      </h4>
                      <p className="text-xs text-foreground/60 truncate">
                        {student.title}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current animate-twinkle" />
                          <span className="text-xs text-foreground/70">
                            {student.rating}
                          </span>
                        </div>
                        <span className="text-xs text-foreground/50">•</span>
                        <span className="text-xs text-foreground/60">
                          {student.coursesCompleted} courses
                        </span>
                      </div>
                      <div className="text-xs text-green-400 font-medium">
                        {student.achievement}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filter Bar */}
            <div className="bg-background/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 p-4 animate-slide-in-right">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <Filter className="w-5 h-5 text-foreground/70" />
                  <div className="flex flex-wrap gap-2">
                    {["all", "listening", "reading", "writing", "grammar"].map(
                      (type, index) => (
                        <button
                          key={type}
                          onClick={() => setSelectedFilter(type)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 animate-fade-in-up ${
                            selectedFilter === type
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg animate-pulse-glow"
                              : "text-foreground/70 hover:bg-background/70 border border-white/20"
                          }`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      )
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-foreground/60">
                  <BarChart3 className="w-4 h-4" />
                  <span className="animate-counter">
                    {filteredFeeds.length} courses found
                  </span>
                </div>
              </div>
            </div>

            {/* Course Feed */}
            <div className="space-y-6">
              {filteredFeeds.map((feed, index) => (
                <div
                  key={feed._id}
                  id={`feed-${index}`}
                  className={`animate-on-scroll bg-background/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                    animatedCards.has(`feed-${index}`)
                      ? "animate-fade-in-up"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Feed Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={feed.instructor.avatar}
                          alt={feed.instructor.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20 animate-pulse-glow"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-foreground">
                              {feed.instructor.name}
                            </h4>
                            {feed.instructor.verified && (
                              <Award className="w-4 h-4 text-blue-400 animate-bounce-subtle" />
                            )}
                          </div>
                          <p className="text-sm text-foreground/50">
                            {feed.instructor.title}
                          </p>
                          <p className="text-xs text-foreground/40">
                            {formatTimeAgo(feed.createdAt)}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 text-foreground/40 hover:text-foreground/70 rounded-full hover:bg-background/50 transition-all duration-300 hover:scale-110">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="lg:w-1/3">
                        <div className="relative group cursor-pointer">
                          <img
                            src={feed.course.thumbnail}
                            alt={feed.course.title}
                            className="w-full h-48 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <button className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 animate-pulse-glow">
                                <Play className="w-5 h-5 text-gray-800 ml-1" />
                              </button>
                            </div>
                          </div>
                          <div
                            className={`absolute top-3 left-3 w-10 h-10 bg-gradient-to-r ${getTypeColor(
                              feed.course.type
                            )} rounded-xl flex items-center justify-center text-white animate-float`}
                          >
                            {getTypeIcon(feed.course.type)}
                          </div>
                        </div>
                      </div>

                      <div className="lg:w-2/3">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30 animate-pulse-glow">
                            {feed.course.level}
                          </span>
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full border border-green-500/30 animate-pulse-glow">
                            {feed.course.duration}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 animate-slide-in-left">
                          {feed.course.title}
                        </h3>
                        <p className="text-foreground/70 mb-4 line-clamp-3 animate-slide-in-left animation-delay-200">
                          {feed.course.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {feed.tags
                            .slice(0, 4)
                            .map((tag: string, tagIndex: number) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-background/30 text-foreground/60 text-sm rounded-full border border-white/20 animate-fade-in-up hover:scale-105 transition-transform duration-300"
                                style={{
                                  animationDelay: `${tagIndex * 100}ms`,
                                }}
                              >
                                #{tag}
                              </span>
                            ))}
                        </div>

                        {/* Course Stats */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 mb-4">
                          <div className="flex items-center space-x-1 animate-fade-in-up">
                            <Users className="w-4 h-4" />
                            <span className="animate-counter">
                              {feed.stats.enrolled.toLocaleString()} students
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 animate-fade-in-up animation-delay-100">
                            {renderStars(Math.floor(feed.stats.averageRating))}
                            <span className="ml-1">
                              {feed.stats.averageRating} (
                              {feed.stats.totalReviews})
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 animate-fade-in-up animation-delay-200">
                            <BookMarked className="w-4 h-4" />
                            <span>{feed.course.lessonsCount} lessons</span>
                          </div>
                        </div>

                        {/* Price and Action */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-foreground animate-bounce-subtle">
                              ${feed.price}
                            </span>
                            <span className="text-sm text-foreground/50 line-through">
                              ${feed.originalPrice}
                            </span>
                            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-medium rounded-full border border-red-500/30 animate-pulse-glow">
                              {Math.round(
                                (1 - feed.price / feed.originalPrice) * 100
                              )}
                              % off
                            </span>
                          </div>
                          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-pulse-glow">
                            Start Learning
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Engagement Actions */}
                  <div className="px-6 py-4 border-t border-white/10 bg-background/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <button
                          className={`flex items-center space-x-2 transition-all duration-300 hover:scale-105 ${
                            feed.isLiked
                              ? "text-red-400"
                              : "text-foreground/50 hover:text-red-400"
                          }`}
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              feed.isLiked
                                ? "fill-current animate-heartbeat"
                                : ""
                            }`}
                          />
                          <span className="animate-counter">
                            {feed.stats.likes}
                          </span>
                        </button>

                        <button
                          onClick={() =>
                            setSelectedFeed(
                              selectedFeed === feed._id ? null : feed._id
                            )
                          }
                          className="flex items-center space-x-2 text-foreground/50 hover:text-blue-400 transition-all duration-300 hover:scale-105"
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span className="animate-counter">
                            {feed.stats.comments}
                          </span>
                        </button>

                        <button className="flex items-center space-x-2 text-foreground/50 hover:text-green-400 transition-all duration-300 hover:scale-105">
                          <Share2 className="w-5 h-5" />
                          <span className="animate-counter">
                            {feed.stats.shares}
                          </span>
                        </button>
                      </div>

                      <button
                        className={`transition-all duration-300 hover:scale-105 ${
                          feed.isBookmarked
                            ? "text-yellow-400"
                            : "text-foreground/50 hover:text-yellow-400"
                        }`}
                      >
                        <Bookmark
                          className={`w-5 h-5 ${
                            feed.isBookmarked
                              ? "fill-current animate-bounce-subtle"
                              : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Compact Comments Section */}
                  {selectedFeed === feed._id && (
                    <div className="border-t border-white/10 p-4 bg-background/30 animate-slide-down">
                      <div className="max-h-64 overflow-y-auto space-y-3">
                        {reviewsFromApi
                          ?.slice(0, 3)
                          .map((review, reviewIndex) => (
                            <div
                              key={review._id}
                              className="bg-background/50 p-3 rounded-xl animate-fade-in-up"
                              style={{
                                animationDelay: `${reviewIndex * 100}ms`,
                              }}
                            >
                              <div className="flex items-start space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold animate-pulse-glow">
                                  {review.userName?.charAt(0) || "U"}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h5 className="font-medium text-foreground text-sm">
                                      {review.userName || "Anonymous"}
                                    </h5>
                                    <div className="flex space-x-1">
                                      {renderStars(review.rating)}
                                    </div>
                                    <span className="text-xs text-foreground/50">
                                      {formatTimeAgo(review.createdAt!)}
                                    </span>
                                  </div>
                                  {review.comment && (
                                    <p className="text-foreground/70 text-sm">
                                      {review.comment}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Share your thoughts about this English course..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="flex-1 px-3 py-2 bg-background/50 border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                          />
                          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 animate-pulse-glow">
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {filteredFeeds.length === 0 && (
                <div className="bg-background/50 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 p-12 text-center animate-fade-in-up">
                  <div className="w-20 h-20 bg-background/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                    <Search className="w-10 h-10 text-foreground/40" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No English courses found
                  </h3>
                  <p className="text-foreground/60 mb-4">
                    Try adjusting your search or filter criteria to find the
                    perfect English learning course.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedFilter("all");
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 animate-pulse-glow"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse-glow"
        >
          <ArrowUp className="w-5 h-5 mx-auto" />
        </button>
      )}
    </div>
  );
}
