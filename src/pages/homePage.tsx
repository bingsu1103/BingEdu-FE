/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  MessageCircle,
  Star,
  Users,
  BookOpen,
  Award,
  Search,
  Send,
  Play,
  ChevronRight,
  Trophy,
  Calendar,
  ChevronLeft,
  Trash2,
  ArrowRight,
  CheckCircle,
  Circle,
  Power,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import coursesService from "@/services/courses.service";
import userService from "@/services/user.service";
import reviewService from "@/services/review.service";
import { UseCurrentApp } from "@/components/context/app.context";
import { message } from "antd";
import SubmissionGraph from "@/components/ui/submission";
import submissionService from "@/services/submission.service";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import homepageultils from "@/utils/homepage";
import formation from "@/utils/format";
import paymentService from "@/services/payment.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  status: "start" | "acceleration" | "final-sprint" | "finish-line";
}

const timelineData: TimelineStep[] = [
  {
    id: 1,
    title: "Roadmap 1",
    description:
      "Detailed description for the first step in the development roadmap",
    status: "start",
  },
  {
    id: 2,
    title: "Roadmap 2",
    description:
      "Detailed description for the second step in the development roadmap",
    status: "acceleration",
  },
  {
    id: 3,
    title: "Roadmap 3",
    description:
      "Detailed description for the third step in the development roadmap",
    status: "final-sprint",
  },
  {
    id: 4,
    title: "Roadmap 4",
    description:
      "Detailed description for the final step in the development roadmap",
    status: "finish-line",
  },
];

export default function HomePage() {
  const [selectedFeed, setSelectedFeed] = useState<string | null>(null);
  const [newComments, setNewComments] = useState<{ [key: string]: string }>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedCards, setAnimatedCards] = useState<Set<string>>(new Set());
  const [listCourses, setListCourses] = useState<ICourses[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [listTeacher, setListTeacher] = useState<IUser[] | null>([]);
  const [listStudent, setListStudent] = useState<IUser[] | null>([]);
  const [listReview, setListReview] = useState<IReview[] | null>([]);
  const [submission, setSubmission] = useState<ISubmission[] | null>([]);
  const [listPayment, setListPayment] = useState<IPayment[] | null>([]);
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
            banner: course.banner || "",
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

  useEffect(() => {
    const fetchPayments = async () => {
      const result = await paymentService.getAllPaymentAPI();
      setListPayment(result.data || []);
    };
    fetchPayments();
  }, []);
  const handlePostComment = async (courseId: string) => {
    if (!user) return;
    await reviewService.createReviewAPI(
      user._id,
      user.name,
      user.avatar || "https://github.com/shadcn.png",
      courseId,
      newComments[courseId] || "", // Use course-specific comment
      5
    );
    const res = await reviewService.getAllReviewAPI();
    const reviews = Array.isArray(res.data)
      ? res.data
      : res.data
      ? [res.data]
      : [];
    setListReview(reviews);
    setNewComments((prev) => ({
      ...prev,
      [courseId]: "",
    }));
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
        <div className="absolute inset-0"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent animate-fade-in-up">
              Master English with Confidence
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
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
                    className="w-12 h-12 bg-background rounded-xl flex items-center justify-center text-foreground mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 animate-float"
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white/90 animate-counter">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
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
            <h3 className="text-2xl font-bold text-white animate-slide-in-left">
              Featured English Courses
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                className="p-1 border border-border transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                onClick={() =>
                  setCurrentSlide(
                    Math.min(
                      homepageultils.featuredCourses.length - 1,
                      currentSlide + 1
                    )
                  )
                }
                className="p-1 border border-border transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl animate-slide-in-right">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {!listCourses?.length
                ? // Render skeleton khi chưa có dữ liệu
                  Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="w-full flex-shrink-0">
                      <Skeleton className="relative h-96 rounded-2xl overflow-hidden">
                        <Skeleton className="absolute inset-0 w-full h-full" />
                        <Skeleton className="absolute bottom-0 left-0 p-8 w-full">
                          <Skeleton className="flex items-center space-x-2 mb-2">
                            <Skeleton className="w-16 h-6 rounded-full" />
                            <Skeleton className="w-10 h-4" />
                          </Skeleton>
                          <Skeleton className="w-2/3 h-8 mb-2" />
                          <Skeleton className="flex items-center justify-between">
                            <Skeleton className="w-24 h-4" />
                            <Skeleton className="w-16 h-8" />
                          </Skeleton>
                        </Skeleton>
                      </Skeleton>
                    </Skeleton>
                  ))
                : listCourses.map((course: any) => (
                    <div key={course._id} className="w-full flex-shrink-0">
                      <div className="relative h-96 bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-2xl overflow-hidden group cursor-pointer">
                        <img
                          src={course.banner}
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
                              {course.type}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current animate-twinkle" />
                              <span className="text-sm">{course.rating}</span>
                            </div>
                          </div>
                          <h4 className="text-2xl font-bold mb-2 animate-slide-in-left">
                            {course.title}
                          </h4>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-white/80">
                              <span className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>
                                  {
                                    listPayment?.filter(
                                      (v) => v.courseId === course._id
                                    ).length
                                  }{" "}
                                  students
                                </span>
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold animate-bounce-subtle">
                                {formation.formatPrice(course.price)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => navigate("/courses")}
                          className="absolute cursor-pointer top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 animate-pulse-glow"
                        >
                          <Play className="w-5 h-5 ml-1" />
                        </Button>
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
            <h3 className="text-3xl font-bold text-white mb-4 animate-fade-in-up">
              Explore English Skills
            </h3>
            <p className="text-white max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Master different aspects of English language with our
              comprehensive course categories designed for all proficiency
              levels.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {homepageultils.categories.map((category: any, index: number) => (
              <div
                key={category.name}
                id={`category-${index}`}
                className={`animate-on-scroll group cursor-pointer p-6 bg-background/10 text-foreground backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-105 ${
                  animatedCards.has(`category-${index}`)
                    ? "animate-fade-in-up"
                    : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-16 h-16 bg-background text-foreground rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto animate-float`}
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  {category.icon}
                </div>
                <h4 className="font-semibold text-white text-center">
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
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-center">
                  Development Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="relative">
                  {timelineData.map((step, index) => (
                    <div
                      key={step.id}
                      className="relative flex items-start mb-6 last:mb-0"
                    >
                      {/* Timeline Line */}
                      {index !== timelineData.length - 1 && (
                        <div className="absolute left-5 top-10 w-0.5 h-12 bg-border"></div>
                      )}

                      {/* Timeline Icon */}
                      <div className="relative z-10 flex-shrink-0">
                        <div
                          className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                            step.status === "start" &&
                              "bg-foreground border-foreground text-background",
                            step.status === "acceleration" &&
                              "bg-background border-foreground text-foreground",
                            step.status === "final-sprint" &&
                              "bg-background border-muted-foreground text-muted-foreground"
                          )}
                        >
                          {step.status === "finish-line" ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : step.status === "final-sprint" ? (
                            <ArrowRight className="w-5 h-5" />
                          ) : step.status === "start" ? (
                            <Power />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="ml-4 flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className={cn(
                              "text-base font-medium",
                              step.status === "start" && "text-foreground",
                              step.status === "acceleration" &&
                                "text-foreground",
                              step.status === "final-sprint" &&
                                "text-muted-foreground"
                            )}
                          >
                            {step.title}
                          </h3>
                          <Badge
                            variant={
                              step.status === "finish-line"
                                ? "default"
                                : "outline"
                            }
                            className={cn(
                              "text-xs h-5",
                              step.status === "start" &&
                                "bg-foreground text-background",
                              step.status === "acceleration" &&
                                "border-foreground text-foreground",
                              step.status === "final-sprint" &&
                                "border-muted-foreground text-muted-foreground"
                            )}
                          >
                            {step.status === "start"
                              ? "Starter"
                              : step.status === "acceleration"
                              ? "Acceleration"
                              : step.status === "final-sprint"
                              ? " Final Sprint"
                              : "Finish Line"}
                          </Badge>
                        </div>
                        <p
                          className={cn(
                            "text-sm leading-relaxed",
                            step.status === "start"
                              ? "text-muted-foreground"
                              : "text-foreground"
                          )}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Live Events */}
            <Card className="bg-background/90 backdrop-blur-sm border-white/10 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Live English Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {homepageultils.liveEvents.map((event: any) => (
                  <Card
                    key={event.id}
                    className="p-3 hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.02] border-muted/50"
                  >
                    <div className="space-y-2">
                      {/* Header with badge and attendees */}
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={
                            event.type === "Live Session"
                              ? "destructive"
                              : event.type === "Workshop"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {event.type}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Users className="w-3 h-3 mr-1" />
                          {event.attendees} attending
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="font-medium text-foreground text-sm">
                        {event.title}
                      </h4>

                      {/* Instructor and schedule */}
                      <div className="grid grid-col-1 gap-1 items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">
                              {event.instructor
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">
                            {event.instructor}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {event.date} at {event.time}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {submission && isAuthenticated && (
              <SubmissionGraph submissions={submission ?? []} />
            )}
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3, 4].map((index) => (
                  <Skeleton
                    key={index}
                    className="bg-background/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 overflow-hidden animate-pulse"
                  >
                    <Skeleton className="p-6">
                      <Skeleton className="flex flex-col lg:flex-row gap-6">
                        <Skeleton className="lg:w-1/3">
                          <Skeleton className="w-full h-48 bg-background/50 rounded-2xl"></Skeleton>
                        </Skeleton>
                        <Skeleton className="lg:w-2/3">
                          <Skeleton className="h-6 bg-background/50 rounded mb-4"></Skeleton>
                          <Skeleton className="h-4 bg-background/30 rounded mb-2"></Skeleton>
                          <Skeleton className="h-4 bg-background/30 rounded mb-4"></Skeleton>
                          <Skeleton className="flex space-x-2">
                            <Skeleton className="h-8 w-20 bg-background/30 rounded"></Skeleton>
                            <Skeleton className="h-8 w-24 bg-background/30 rounded"></Skeleton>
                          </Skeleton>
                        </Skeleton>
                      </Skeleton>
                    </Skeleton>
                  </Skeleton>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {listCourses.length > 0 ? (
                  listCourses.slice(0, 4).map((course, index) => (
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
                                className={`absolute top-3 left-3 w-10 h-10 bg-gradient-to-r ${homepageultils.getTypeColor(
                                  course.type
                                )} rounded-xl flex items-center justify-center text-white animate-float`}
                              >
                                {homepageultils.getTypeIcon(course.type)}
                              </div>
                            </div>
                          </div>

                          <div className="lg:w-2/3">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="default" className="bg-blue-500">
                                {course.type}
                              </Badge>
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
                                  {
                                    listPayment?.filter(
                                      (v) => v.courseId === course._id
                                    ).length
                                  }{" "}
                                  students
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
                            <div className="grid grid-cols-1 gap-3 lg:flex lg:items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-2xl font-bold text-foreground animate-bounce-subtle">
                                  {formation.formatPrice(course.price)}
                                </span>
                                <span className="text-sm text-foreground/50 line-through">
                                  {formation.formatPrice(course.price + 90000)}
                                </span>
                                <Badge variant="destructive">
                                  {(
                                    (1 -
                                      course.price / (90000 + course.price)) *
                                    100
                                  ).toFixed(2)}{" "}
                                  % off
                                </Badge>
                              </div>
                              <Button
                                onClick={() => navigate("/checkout")}
                                className="px-6 py-3 cursor-pointer w-fit rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
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
                                        review?.avatar ||
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
                                            ? homepageultils.formatTimeAgo(
                                                review.createdAt
                                              )
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
                                value={newComments[course._id] || ""}
                                onChange={(e) =>
                                  setNewComments((prev) => ({
                                    ...prev,
                                    [course._id]: e.target.value,
                                  }))
                                }
                                className="flex-1 px-3 py-2 bg-background/50 border border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                              />
                              <Button
                                onClick={() => handlePostComment(course._id)}
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
                    <div className="w-20 h-20 bg-background/30 rounded-full flex items-center justify-center mx-auto mb-4">
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
