import {
  ArrowLeft,
  Play,
  Clock,
  Award,
  CheckCircle,
  Lock,
  BookOpen,
  FileText,
  Headphones,
  Users,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UseTheme } from "../context/theme.context";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import coursesService from "@/services/courses.service";
import lessonService from "@/services/lesson.service";
import { Button } from "../ui/button";
import progressService from "@/services/progress.service";
import { UseCurrentApp } from "../context/app.context";

// Define ICourse interface for course data
const getLevelColor = (level: string) => {
  switch (level) {
    case "beginner":
      return "bg-green-100 text-green-800";
    case "intermediate":
      return "bg-yellow-100 text-yellow-800";
    case "advanced":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "multiple_choice":
      return <FileText className="w-5 h-5" />;
    case "fill_in_blank":
      return <BookOpen className="w-5 h-5" />;
    case "audio_exercise":
      return <Headphones className="w-5 h-5" />;
    default:
      return <FileText className="w-5 h-5" />;
  }
};

const getCourseTypeIcon = (type: string) => {
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

const getCourseTypeColor = (type: string) => {
  switch (type) {
    case "listening":
      return "bg-blue-100 text-blue-800";
    case "reading":
      return "bg-green-100 text-green-800";
    case "speaking":
      return "bg-purple-100 text-purple-800";
    case "writing":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const LessonList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedListLesson, setSelectedListLesson] = useState<ILesson[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<ICourses | null>(null);
  const [courseProgress, setCourseProgress] = useState<IProgressCourses | null>(
    null
  );
  const { theme } = UseTheme();
  const navigate = useNavigate();
  const { user, isAuthenticated } = UseCurrentApp();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lessonsRes = await lessonService.getLessonByCourseIdAPI(id!);
        setSelectedListLesson(lessonsRes.data || []);
        const courseRes = await coursesService.getCourseAPI(id!);
        setSelectedCourse(courseRes.data || null);
        const progress = await progressService.getCourseProgressAPI(
          user?._id || "",
          courseRes.data?._id || ""
        );
        const dataProgress = progress.data;
        setCourseProgress(dataProgress || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id, user?._id]);

  return (
    <div className="container mx-auto px-4 py-8 bg-background">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/courses")}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 group transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Courses
        </button>

        <div
          className={`${
            theme === "dark" ? "bg-blue-400" : "bg-background"
          } rounded-2xl shadow-lg p-8`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center text-foreground">
                {getCourseTypeIcon(selectedCourse?.type || "")}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {selectedCourse?.title || "Loading Course..."}
                </h1>
                <div className="flex items-center space-x-4 text-foreground">
                  <span className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {selectedListLesson.length} Lessons
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedListLesson.reduce(
                      (acc, lesson) => acc + (lesson.time || 0),
                      0
                    )}
                    <span>m</span>
                  </span>
                  <span className="flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    Certificate
                  </span>
                </div>
              </div>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${getCourseTypeColor(
                selectedCourse?.type || ""
              )}`}
            >
              {selectedCourse?.type.toUpperCase() || "UNKNOWN"}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-background rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            Course Progress
          </h2>
          <span className="text-sm text-foreground">
            {courseProgress?.lessonsIdComplete.length ?? 0} of{" "}
            {selectedListLesson.length} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full"
            style={{
              width: `${
                selectedListLesson.length > 0
                  ? ((courseProgress?.lessonsIdComplete?.length ?? 0) /
                      selectedListLesson.length) *
                    100
                  : 0
              }%`,
            }}
          ></div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        {selectedListLesson.length === 0 ? (
          <div className="bg-background rounded-2xl shadow-lg p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No lessons available
            </h3>
            <p className="text-foreground">
              Lessons for this course will be available soon.
            </p>
          </div>
        ) : (
          selectedListLesson.map((lesson, index) => {
            const isCompleted =
              courseProgress?.lessonsIdComplete?.includes(lesson._id) ?? false;
            const isLocked = index > 4;

            return (
              <div
                key={lesson._id}
                className={`bg-background rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  !isLocked
                    ? "cursor-pointer hover:-translate-y-1"
                    : "opacity-60"
                } `}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Lesson Status Icon */}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? "bg-green-100 text-green-600"
                            : isLocked
                            ? "bg-gray-100 text-gray-400"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : isLocked ? (
                          <Lock className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6" />
                        )}
                      </div>

                      {/* Lesson Info */}
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">
                          {lesson.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-foreground">
                          <span className="flex items-center">
                            {getTypeIcon(lesson.type)}
                            <span className="ml-1 capitalize">
                              {lesson.type.replace("_", " ")}
                            </span>
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {lesson.time} min
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Lesson Level and Action */}
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(
                          lesson.level
                        )}`}
                      >
                        {lesson.level.toUpperCase()}
                      </span>

                      {!isLocked && (
                        <Dialog>
                          <DialogTrigger>
                            <Button
                              className="cursor-pointer"
                              variant="outline"
                            >
                              {isCompleted ? (
                                <span>Retry</span>
                              ) : (
                                <span>Start</span>
                              )}
                            </Button>
                          </DialogTrigger>
                          {isAuthenticated ? (
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Ready to start the test?
                                </DialogTitle>
                                <DialogDescription>
                                  <div className="flex gap-2 mt-2 float-end">
                                    <Button
                                      onClick={() =>
                                        navigate(
                                          `/courses/${id}/lesson/${lesson._id}`
                                        )
                                      }
                                      className={`cursor-pointer ${
                                        isCompleted
                                          ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                          : "bg-blue-500 text-white hover:bg-blue-600"
                                      }`}
                                    >
                                      OK
                                    </Button>
                                    <DialogTrigger>
                                      <Button className="cursor-pointer">
                                        Cancel
                                      </Button>
                                    </DialogTrigger>
                                  </div>
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          ) : (
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>You need to login!</DialogTitle>
                                <DialogDescription>
                                  <div className="flex gap-2 mt-2 float-end">
                                    <Button
                                      onClick={() => navigate("/login")}
                                      className={`cursor-pointer ${
                                        isCompleted
                                          ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                          : "bg-blue-500 text-white hover:bg-blue-600"
                                      }`}
                                    >
                                      Login
                                    </Button>
                                    <DialogTrigger>
                                      <Button className="cursor-pointer">
                                        Cancel
                                      </Button>
                                    </DialogTrigger>
                                  </div>
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          )}
                        </Dialog>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Course Completion Card */}
      {selectedListLesson.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-8 text-foreground">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Complete the Course</h3>
              <p className="text-foreground">
                Finish all lessons to earn your certificate and unlock advanced
                courses
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold mb-1">
                {((courseProgress?.lessonsIdComplete.length ?? 0) /
                  selectedListLesson.length) *
                  100}
                %
              </div>
              <div className="text-foreground text-sm">Completed</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonList;
