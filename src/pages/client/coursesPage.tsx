import { useState } from "react";
import {
  BookOpen,
  Clock,
  Award,
  Play,
  CheckCircle,
  Star,
  Filter,
  Search,
  Grid,
  List,
  TrendingUp,
  Users,
  Calendar,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  thumbnail: string;
  category: string;
  duration: string;
  completed?: boolean;
  certificate?: boolean;
  rating?: number;
  students?: number;
  level?: string;
  lastAccessed?: string;
}

function CoursesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const currentCourses: Course[] = [
    {
      id: "1",
      title: "IELTS Speaking Mastery",
      instructor: "Emma Thompson",
      progress: 75,
      thumbnail:
        "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "IELTS",
      duration: "8h 30m",
      rating: 4.8,
      students: 1250,
      level: "Intermediate",
      lastAccessed: "2024-03-15",
    },
    {
      id: "2",
      title: "Business English Communication",
      instructor: "Michael Davis",
      progress: 45,
      thumbnail:
        "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Business English",
      duration: "6h 15m",
      rating: 4.6,
      students: 890,
      level: "Advanced",
      lastAccessed: "2024-03-14",
    },
    {
      id: "3",
      title: "TOEFL Preparation Course",
      instructor: "Sarah Wilson",
      progress: 20,
      thumbnail:
        "https://images.pexels.com/photos/5427674/pexels-photo-5427674.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "TOEFL",
      duration: "5h 45m",
      rating: 4.7,
      students: 650,
      level: "Intermediate",
      lastAccessed: "2024-03-13",
    },
  ];

  const completedCourses: Course[] = [
    {
      id: "4",
      title: "English Grammar Fundamentals",
      instructor: "Jennifer Brown",
      progress: 100,
      thumbnail:
        "https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Grammar",
      duration: "10h 20m",
      completed: true,
      certificate: true,
      rating: 4.9,
      students: 2100,
      level: "Beginner",
      lastAccessed: "2024-02-28",
    },
    {
      id: "5",
      title: "Advanced English Vocabulary",
      instructor: "David Miller",
      progress: 100,
      thumbnail:
        "https://images.pexels.com/photos/5427829/pexels-photo-5427829.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Vocabulary",
      duration: "7h 30m",
      completed: true,
      certificate: true,
      rating: 4.8,
      students: 1800,
      level: "Advanced",
      lastAccessed: "2024-02-15",
    },
    {
      id: "6",
      title: "English Pronunciation Workshop",
      instructor: "Lisa Anderson",
      progress: 100,
      thumbnail:
        "https://images.pexels.com/photos/5212663/pexels-photo-5212663.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Pronunciation",
      duration: "4h 45m",
      completed: true,
      certificate: true,
      rating: 4.7,
      students: 950,
      level: "Intermediate",
      lastAccessed: "2024-01-20",
    },
  ];

  const allCourses = [...currentCourses, ...completedCourses];

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === "all") return matchesSearch;
    if (filter === "current") return matchesSearch && !course.completed;
    if (filter === "completed") return matchesSearch && course.completed;
    if (filter === "certificates") return matchesSearch && course.certificate;

    return matchesSearch;
  });

  const CourseCardGrid = ({ course }: { course: Course }) => (
    <div className="bg-background rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-background backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-foreground">
            {course.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          {course.certificate && (
            <div className="bg-yellow-400 p-1.5 rounded-full">
              <Award size={14} className="text-white" />
            </div>
          )}
          {course.completed && (
            <div className="bg-green-500 p-1.5 rounded-full">
              <CheckCircle size={14} className="text-white" />
            </div>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">
              {course.rating}
            </span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Users size={14} />
            {course.students}
          </div>
          <span className="text-gray-300">•</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            {course.level}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          Giảng viên: {course.instructor}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            {course.duration}
          </div>
          {course.lastAccessed && (
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(course.lastAccessed).toLocaleDateString("vi-VN")}
            </div>
          )}
        </div>

        {!course.completed && (
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tiến độ</span>
              <span className="font-medium text-gray-900">
                {course.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
          {course.completed ? (
            <>
              <Award size={16} />
              Xem chứng chỉ
            </>
          ) : (
            <>
              <Play size={16} />
              Tiếp tục học
            </>
          )}
        </button>
      </div>
    </div>
  );

  const CourseCardList = ({ course }: { course: Course }) => (
    <div className="bg-background rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex gap-6">
        <div className="relative flex-shrink-0">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-32 h-24 object-cover rounded-lg"
          />
          {course.certificate && (
            <div className="absolute -top-2 -right-2 bg-yellow-400 p-1.5 rounded-full">
              <Award size={12} className="text-white" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors cursor-pointer">
                {course.title}
              </h3>
              <p className="text-gray-600 text-sm">
                Giảng viên: {course.instructor}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-current" />
                {course.rating}
              </div>
              <div className="flex items-center gap-1">
                <Users size={14} />
                {course.students}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                {course.duration}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
              {course.category}
            </span>
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              {course.level}
            </span>
            {course.completed && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                <CheckCircle size={12} />
                Hoàn thành
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            {!course.completed ? (
              <div className="flex-1 mr-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Tiến độ</span>
                  <span className="font-medium text-gray-900">
                    {course.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1 mr-4">
                <p className="text-sm text-gray-600">
                  Hoàn thành vào:{" "}
                  {course.lastAccessed &&
                    new Date(course.lastAccessed).toLocaleDateString("vi-VN")}
                </p>
              </div>
            )}

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
              {course.completed ? (
                <>
                  <Award size={16} />
                  Xem chứng chỉ
                </>
              ) : (
                <>
                  <Play size={16} />
                  Tiếp tục
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background text-foreground shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                My Courses
              </h1>
              <p className="text-foreground">Management & Processing</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Find courses"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>

              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-background shadow-sm text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-background shadow-sm text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-background rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen size={24} className="text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {allCourses.length}
                </div>
                <div className="text-foreground text-sm">Total courses</div>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp size={24} className="text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {currentCourses.length}
                </div>
                <div className="text-foreground text-sm">Studying</div>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle size={24} className="text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {completedCourses.length}
                </div>
                <div className="text-foreground text-sm">Complete</div>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award size={24} className="text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {completedCourses.filter((c) => c.certificate).length}
                </div>
                <div className="text-foreground text-sm">Certificates</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-600" />
            <span className="text-sm font-medium text-foreground">Fill:</span>
          </div>
          <div className="flex gap-2">
            {[
              { key: "all", label: "All" },
              { key: "current", label: "Studying" },
              { key: "completed", label: "Completed" },
              { key: "certificates", label: "Achieved" },
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors ${
                  filter === filterOption.key
                    ? "bg-blue-400 text-foreground"
                    : "bg-background text-foreground hover:bg-transparent border border-gray-100"
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Courses */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredCourses.map((course) =>
            viewMode === "grid" ? (
              <CourseCardGrid key={course.id} course={course} />
            ) : (
              <CourseCardList key={course.id} course={course} />
            )
          )}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không tìm thấy khóa học
            </h3>
            <p className="text-gray-600">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursesPage;
