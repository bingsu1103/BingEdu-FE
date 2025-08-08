import { useState, useEffect } from "react";
import {
  MessageCircle,
  Star,
  Clock,
  Users,
  BookOpen,
  Headphones,
  FileText,
  Award,
  Search,
  MoreHorizontal,
  Send,
  PenTool,
  BookMarked,
  Play,
  ChevronRight,
  Trophy,
  Calendar,
  Briefcase,
  ChevronLeft,
  Siren as Fire,
  Activity,
  Trash2,
} from "lucide-react";
import coursesService from "@/services/courses.service";
import userService from "@/services/user.service";
import reviewService from "@/services/review.service";
import { UseCurrentApp } from "@/components/context/app.context";
import { message } from "antd";
import SubmissionGraph from "@/components/ui/submission";
import submissionService from "@/services/submission.service";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

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
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Grammar",
    icon: <PenTool className="w-8 h-8" />,
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "Business English",
    icon: <Briefcase className="w-8 h-8" />,
    color: "from-green-500 to-green-600",
  },
  {
    name: "Conversation",
    icon: <MessageCircle className="w-8 h-8" />,
    color: "from-orange-500 to-orange-600",
  },
  {
    name: "Listening",
    icon: <Headphones className="w-8 h-8" />,
    color: "from-pink-500 to-pink-600",
  },
  {
    name: "Writing",
    icon: <BookOpen className="w-8 h-8" />,
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedCards, setAnimatedCards] = useState<Set<string>>(new Set());
  const [listCourses, setListCourses] = useState<ICourses[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [listTeacher, setListTeacher] = useState<IUser[] | null>([]);
  const [listStudent, setListStudent] = useState<IUser[] | null>([]);
  const [listReview, setListReview] = useState<IReview[] | null>([]);
  const [submission, setSubmission] = useState<ISubmission[] | null>([]);
  const { user, isAuthenticated } = UseCurrentApp();
  const navigate = useNavigate();

  useEffect(() => {
    const observeCards = () => {
      const cards = document.querySelectorAll(".animate-on-scroll");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setAnimatedCards((prev) => new Set([...prev, entry.target.id]));
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "50px" }
      );

      cards.forEach((card) => observer.observe(card));
      return () => observer.disconnect();
    };

    const cleanup = observeCards();
    return cleanup;
  }, [listCourses]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCourses.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAllUser = async () => {
      const listUser = await userService.getAllUser();
      setListStudent(listUser.data?.filter((v) => v.role === "user") || []);
      setListTeacher(listUser.data?.filter((v) => v.role === "teacher") || []);
    };
    fetchAllUser();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const coursesRes = await coursesService.getAllCoursesAPI();
        const validCourses =
          coursesRes.data?.map((course: ICourses) => ({
            _id: course._id || "",
            title: course.title || "Untitled Course",
            description: course.description || "",
            price: course.price || 0,
            type: course.type || "mixed",
            thumbnail: course.thumbnail || "default-thumbnail.jpg",
          })) || [];
        setListCourses([...validCourses]);
      } catch (error) {
        console.error("Failed to fetch courses", error);
        setListCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  useEffect(() => {
    const fetchSubmission = async () => {
      const resSubmission = await submissionService.getSubmissionByUserIdAPI(
        user?._id || ""
      );
      setSubmission(resSubmission.data || []);
    };
    fetchSubmission();
  }, [user]);

  useEffect(() => {
    const fetchReviews = async () => {
      const result = await reviewService.getAllReviewAPI();
      const reviews = Array.isArray(result?.data)
        ? result.data
        : result?.data
        ? [result.data]
        : [];
      setListReview(reviews);
    };
    fetchReviews();
  }, []);
  const handlePostComment = async () => {
    if (!user) return;
    await reviewService.createReviewAPI(
      user._id,
      user.name,
      selectedFeed || "",
      newComment,
      5
    );
    const res = await reviewService.getAllReviewAPI();
    const reviews = Array.isArray(res.data)
      ? res.data
      : res.data
      ? [res.data]
      : [];
    setListReview(reviews);
    setNewComment("");
  };
  const handleDeleteComment = async (id: string) => {
    const res = await reviewService.deleteReviewAPI(id);
    if (res.data && res.data.deletedCount) {
      message.success("Comment deleted");
      const remainReview = await reviewService.getAllReviewAPI();
      const reviews = Array.isArray(remainReview?.data)
        ? remainReview.data
        : remainReview?.data
        ? [remainReview.data]
        : [];
      setListReview(reviews);
      return;
    }
    message.error("Deleted failed");
  };

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

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                {
                  label: "Active Students",
                  value: listStudent?.length,
                  icon: <Users className="w-6 h-6" />,
                },
                {
                  label: "Expert Teachers",
                  value: listTeacher?.length,
                  icon: <Award className="w-6 h-6" />,
                },
                {
                  label: "English Courses",
                  value: listCourses.length,
                  icon: <BookOpen className="w-6 h-6" />,
                },
                {
                  label: "Success Stories",
                  value: "10+",
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
                <h4 className="font-semibold text-foreground text-center">
                  {category.name}
                </h4>
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
            {submission && isAuthenticated && (
              <SubmissionGraph submissions={submission ?? []} />
            )}
            {/* Course Feed */}
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="bg-background/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 overflow-hidden animate-pulse"
                  >
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-1/3">
                          <div className="w-full h-48 bg-background/50 rounded-2xl"></div>
                        </div>
                        <div className="lg:w-2/3">
                          <div className="h-6 bg-background/50 rounded mb-4"></div>
                          <div className="h-4 bg-background/30 rounded mb-2"></div>
                          <div className="h-4 bg-background/30 rounded mb-4"></div>
                          <div className="flex space-x-2">
                            <div className="h-8 w-20 bg-background/30 rounded"></div>
                            <div className="h-8 w-24 bg-background/30 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {listCourses.length > 0 ? (
                  listCourses.slice(0, 3).map((course, index) => (
                    <div
                      key={course._id}
                      id={`feed-${index}`}
                      className={`animate-on-scroll bg-background/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-101 ${
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
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold animate-pulse-glow">
                              {course.title.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground">
                                English Learning Course
                              </h4>
                              <p className="text-sm text-foreground/50">
                                Expert Instructor
                              </p>
                              <p className="text-xs text-foreground/40">
                                Recently updated
                              </p>
                            </div>
                          </div>
                          <button className="p-2 text-foreground/40 hover:text-foreground/70 rounded-full hover:bg-background/50 transition-all duration-300 hover:scale-105">
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
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-48 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
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
                                  course.type
                                )} rounded-xl flex items-center justify-center text-white animate-float`}
                              >
                                {getTypeIcon(course.type)}
                              </div>
                            </div>
                          </div>

                          <div className="lg:w-2/3">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30">
                                {course.type}
                              </span>
                            </div>

                            <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 animate-slide-in-left">
                              {course.title}
                            </h3>
                            <p className="text-foreground/70 mb-4 line-clamp-3 animate-slide-in-left animation-delay-200">
                              {course.description ||
                                "Enhance your English skills with this comprehensive course designed to improve your language proficiency."}
                            </p>

                            {/* Course Stats */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 mb-4">
                              <div className="flex items-center space-x-1 animate-fade-in-up">
                                <Users className="w-4 h-4" />
                                <span className="animate-counter">
                                  1,234 students
                                </span>
                              </div>
                              <div className="flex items-center space-x-1 animate-fade-in-up animation-delay-100">
                                {renderStars(5)}
                                <span className="ml-1">
                                  {(() => {
                                    const reviews =
                                      listReview?.filter(
                                        (v) => v.courseID === course._id
                                      ) ?? [];
                                    const total = reviews.reduce(
                                      (acc, v) => acc + (v.rating || 0),
                                      0
                                    );
                                    const avg =
                                      reviews.length > 0
                                        ? total / reviews.length
                                        : 0;
                                    return avg.toFixed(2);
                                  })()}
                                </span>
                              </div>
                            </div>

                            {/* Price and Action */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-2xl font-bold text-foreground animate-bounce-subtle">
                                  VND {course.price}
                                </span>
                                <span className="text-sm text-foreground/50 line-through">
                                  VND {course.price + 90000}
                                </span>
                                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-medium rounded-full border border-red-500/30 animate-pulse-glow">
                                  {(
                                    (1 -
                                      course.price / (90000 + course.price)) *
                                    100
                                  ).toFixed(2)}{" "}
                                  % off
                                </span>
                              </div>
                              <Button
                                onClick={() => navigate("/checkout")}
                                className="px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                              >
                                Start Learning
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Engagement Actions */}
                      <div className="px-6 py-4 border-t border-white/10 bg-background/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <button
                              onClick={() =>
                                setSelectedFeed(
                                  selectedFeed === course._id
                                    ? null
                                    : course._id
                                )
                              }
                              className="cursor-pointer flex items-center space-x-2 text-foreground/50 hover:text-blue-400 transition-all duration-300 hover:scale-105"
                            >
                              <MessageCircle className="w-5 h-5" />
                              <span className="animate-counter">
                                {listReview?.filter(
                                  (v) => v.courseID === course._id
                                ).length ?? 0}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Compact Comments Section */}
                      {selectedFeed === course._id && (
                        <div className="border-t border-white/10 p-4 bg-background/30 animate-slide-down">
                          <div className="max-h-64 overflow-y-auto space-y-3">
                            {listReview
                              ?.filter((v) => v.courseID === course._id)
                              ?.map((review, reviewIndex) => (
                                <div
                                  key={review.courseID}
                                  className="bg-background/50 p-3 rounded-xl animate-fade-in-up"
                                  style={{
                                    animationDelay: `${reviewIndex * 100}ms`,
                                  }}
                                >
                                  <div className="flex items-start space-x-2">
                                    <img
                                      src={
                                        user?.avatar ||
                                        "https://github.com/shadcn.png"
                                      }
                                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                                    />
                                    {/* {review.userName?.charAt(0) || "U"}
                                    </img> */}
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center space-x-2 mb-1">
                                        <h5 className="font-medium text-foreground text-sm">
                                          {review.userName || "Anonymous"}
                                        </h5>
                                        <span className="text-xs text-foreground/50">
                                          {review.createdAt
                                            ? formatTimeAgo(review.createdAt)
                                            : "Recently"}
                                        </span>
                                      </div>
                                      {review.comment && (
                                        <p className="text-foreground/70 text-sm">
                                          {review.comment}
                                        </p>
                                      )}
                                    </div>
                                    {review.userID === user?._id && (
                                      <button
                                        onClick={() =>
                                          handleDeleteComment(review._id)
                                        }
                                        className="cursor-pointer trash"
                                      >
                                        <Trash2 className="w-5" />
                                      </button>
                                    )}
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
                              <Button
                                onClick={handlePostComment}
                                className="cursor-pointer px-4 py-2 rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="bg-background/50 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 p-12 text-center animate-fade-in-up">
                    <div className="w-20 h-20 bg-background/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                      <Search className="w-10 h-10 text-foreground/40" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No English courses found
                    </h3>
                    <p className="text-foreground/60 mb-4">
                      It looks like there are no courses available at the
                      moment. Please check back later.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
