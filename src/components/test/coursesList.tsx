import coursesService from "@/services/courses.service";
import userService from "@/services/user.service";
import {
  BookOpen,
  Headphones,
  FileText,
  Users,
  Star,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const getTypeIcon = (type: string) => {
  switch (type) {
    case "listening":
      return <Headphones className="w-6 h-6" />;
    case "reading":
      return <BookOpen className="w-6 h-6" />;
    case "speaking":
      return <Users className="w-6 h-6" />;
    case "writing":
      return <FileText className="w-6 h-6" />;
    default:
      return <BookOpen className="w-6 h-6" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "listening":
      return "from-blue-500 to-blue-600";
    case "reading":
      return "from-green-500 to-green-600";
    case "speaking":
      return "from-purple-500 to-purple-600";
    case "writing":
      return "from-orange-500 to-orange-600";
    default:
      return "from-gray-500 to-gray-600";
  }
};

const CourseList: React.FC = () => {
  const [listCourse, setListCourses] = useState<ICourses[]>([]);
  const [listStudent, setListStudent] = useState<IUser[]>([]);
  useEffect(() => {
    const fetchCourse = async () => {
      const listCourse = await coursesService.getAllCoursesAPI();
      setListCourses(listCourse.data || []);
    };
    fetchCourse();
  }, []);

  useEffect(() => {
    const fetchStudent = async () => {
      const listUser = await userService.getAllUser();
      const listStudent = (listUser.data ?? []).filter(
        (v) => v.role === "user"
      );
      setListStudent(listStudent);
    };
    fetchStudent();
  });
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-background rounded-full shadow-lg mb-6">
          <BookOpen className="w-8 h-8 text-foreground" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Choose Your Learning Path
        </h1>
        <p className="text-xl text-foreground max-w-2xl mx-auto">
          Discover our comprehensive courses designed to enhance your English
          skills and achieve your goals.
        </p>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {listCourse.map((course) => (
          <div
            key={course._id}
            // onClick={() => onCourseSelect(course)}
            className="group bg-background rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
          >
            {/* Course Header */}
            <div
              className={`h-32 bg-gradient-to-r ${getTypeColor(
                course.type
              )} p-6 relative overflow-hidden`}
            >
              <div className="absolute top-4 right-4 bg-background bg-opacity-20 rounded-full p-2">
                {getTypeIcon(course.type)}
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
            </div>

            {/* Course Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full text-foreground bg-gradient-to-r ${getTypeColor(
                    course.type
                  )}`}
                >
                  {course.type.toUpperCase()}
                </span>
                <div className="flex items-center text-foreground">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs text-foreground ml-1">4.8</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-foreground transition-colors truncate">
                {course.title}
              </h3>

              <div className="flex items-center justify-between text-sm text-foreground mb-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>lessons</span>
                </div>
                {/* <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>2.4k students</span>
                </div> */}
              </div>

              <div className="flex items-center justify-between">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full w-3/5"></div>
                </div>
                <span className="text-xs text-foreground ml-3">60%</span>
              </div>
            </div>

            {/* Course Footer */}
            <div className="px-6 pb-6">
              <button
                onClick={() => navigate(`/courses/${course._id}/lesson`)}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-foreground py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform group-hover:scale-105"
              >
                Start Learning
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-16 bg-blue-400 rounded-2xl shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-foreground">
              {listCourse.length}
            </div>
            <div className="text-foreground">Courses Available</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-foreground">
              {listStudent.length} +
            </div>
            <div className="text-foreground">Active Students</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-foreground">95%</div>
            <div className="text-foreground">Success Rate</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-foreground">24/7</div>
            <div className="text-foreground">Support Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
