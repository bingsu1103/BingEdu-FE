import React, { useEffect, useState } from "react";
import {
  Plus,
  Upload,
  X,
  BookOpen,
  Eye,
  Edit,
  Trash2,
  ArrowLeft,
  FileMinus,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeleteOutlined } from "@ant-design/icons";
import questionService from "@/services/question.service";
import lessonService from "@/services/lesson.service";
import { message } from "antd";
import coursesService from "@/services/courses.service";
import { Button } from "../ui/button";
import CreateLesson from "../manager/createLesson";
import { Popconfirm } from "antd";
import { Badge } from "../ui/badge";
import EditQuestion from "../manager/editQuestion";

const LessonDashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState<ICourses | null>(null);
  const [listCourses, setListCourses] = useState<ICourses[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [viewingLessonDetail, setViewingLessonDetail] = useState<string | null>(
    null
  );
  const [uploading, setUploading] = useState(false);
  const [listLesson, setListLesson] = useState<ILesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<ILesson | null>(null);
  const [listQuestion, setListQuestion] = useState<IQuestion[]>([]);

  const type = selectedLesson?.type;

  const actualType =
    type === "mixed"
      ? Math.random() > 0.5
        ? "multiple_choice"
        : "essay"
      : type;

  const jsonInstructionFormat = `[
  {
    "lesson": {
      "id": "${selectedLesson?._id}",
      "level": "${selectedLesson?.level}"
    },
    "question_type": "${actualType}",
    "question_text": "xxxxx",
    ${
      actualType === "multiple_choice"
        ? `"options": {
      "A": "xxxx",
      "B": "xxxx",
      "C": "xxxx",
      "D": "xxxx"
    },
    "correct_answer_key": "X",`
        : `"correct_answer_text": "xxxx",`
    }
    "explanation": "xxxx"
  }
]`;

  const note = `
- If "question_type" = "mixed":
    + Allow either "multiple_choice" or "essay" format
`;

  useEffect(() => {
    const getAllCourse = async () => {
      const res = await coursesService.getAllCoursesAPI();
      setListCourses(res.data || []);
    };
    getAllCourse();
  }, []);

  const handleCourseSelect = async (courseId: string) => {
    const courses = await coursesService.getCourseAPI(courseId);
    setSelectedCourse(courses.data || null);
    setViewingLessonDetail(null);
    const res = await lessonService.getLessonByCourseIdAPI(courseId);
    setListLesson(res.data || []);
  };

  const handleAddQuestion = (lesson: ILesson) => {
    setIsModalOpen(true);
    setSelectedLesson(lesson);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/json") {
      setUploadedFile(file);
    } else {
      alert("Please upload a valid JSON file");
    }
  };

  const handleUploadSubmit = async () => {
    if (uploadedFile) {
      setUploading(true);
      try {
        const res = await questionService.createListQuestionAPI(uploadedFile);
        alert("Questions uploaded successfully!");
        console.log(res);
        setIsModalOpen(false);
        setUploadedFile(null);
      } catch {
        alert(
          "Failed to upload questions. Please check your file and try again."
        );
      } finally {
        setUploading(false);
      }
    } else {
      alert("Please select a JSON file to upload");
    }
  };

  const handleViewDetail = async (lesson: ILesson) => {
    setViewingLessonDetail(lesson._id);
    setSelectedLesson(lesson);
    const questionRes = await questionService.getQuestionByLessonIdAPI(
      lesson._id
    );
    setListQuestion(questionRes.data || []);
  };

  const handleBackToLessons = () => {
    setViewingLessonDetail(null);
  };

  const handleDeleteLesson = async (lesson: ILesson) => {
    try {
      const deleteRes = await lessonService.deleteLessonAPI(lesson._id);

      if (deleteRes.data && deleteRes.data.acknowledged) {
        message.success("Delete lesson successfully!");
        return;
      }
      message.error(
        "Delete lesson failed! " + (deleteRes.message || "Unknown error")
      );
    } catch (error) {
      console.log("Error details:", error);
      message.error("Delete lesson failed! ERROR SERVER!");
    }
  };
  const viewingLesson = listLesson.find(
    (lesson) => lesson._id === viewingLessonDetail
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-5 py-2">
        {/* Course Selection */}
        <div className="bg-background rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Select Course
          </h2>
          <div className="relative flex justify-between">
            <select
              value={selectedCourse?._id || ""}
              onChange={(e) => handleCourseSelect(e.target.value)}
              className="w-full max-w-md appearance-none bg-background border border-gray-300 rounded-lg px-4 py-2 pr-8 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Choose a course...</option>
              {listCourses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
            {selectedCourse && (
              <div className="flex gap-2 max-sm:flex-col">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="cursor-pointer flex items-center gap-1">
                      <FileMinus />
                      <span>Add lesson</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add lesson</DialogTitle>
                      <DialogDescription>
                        Fill all fields below to add a lesson
                      </DialogDescription>
                    </DialogHeader>
                    <CreateLesson courses={selectedCourse} />
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </div>

        {/* Lessons List */}
        {selectedCourse && !viewingLessonDetail && (
          <div className="bg-background rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  Lessons - {selectedCourse?.title}
                </h2>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {listLesson.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-foreground">
                    No lessons found for this course
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {listLesson.map((lesson) => (
                    <div
                      key={lesson._id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                    >
                      <div className="flex-1 mb-4 sm:mb-0">
                        <h3 className="font-medium text-foreground mb-1 text-base sm:text-lg">
                          {lesson.title}
                        </h3>
                        <Badge>{lesson.level}</Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                        <button
                          onClick={() => handleViewDetail(lesson)}
                          className="inline-flex items-center cursor-pointer justify-center px-3 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors w-full sm:w-auto"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Detail
                        </button>
                        <button
                          onClick={() => handleAddQuestion(lesson)}
                          className="inline-flex items-center cursor-pointer justify-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors w-full sm:w-auto"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Question
                        </button>
                        <Popconfirm
                          title="Delete User"
                          onConfirm={() => handleDeleteLesson(lesson)}
                          description="Are you sure to delete this user?"
                          okText="Yes"
                          cancelText="No"
                        >
                          <button className="inline-flex items-center justify-center px-3 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors w-full sm:w-auto">
                            <DeleteOutlined className="h-4 w-4 mr-2" />
                            Delete
                          </button>
                        </Popconfirm>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Lesson Detail View */}
      {viewingLessonDetail && viewingLesson && (
        <div className="bg-background rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToLessons}
                  className="inline-flex items-center text-foreground hover:text-blue-400 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Lessons
                </button>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {viewingLesson.title}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {listQuestion.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-foreground mb-4">
                  No questions found for this lesson
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {listQuestion.map((question, index) => (
                  <div
                    key={question._id}
                    className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center space-x-3 mb-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Question {index + 1}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-3">
                          {question.question_text}
                        </h3>

                        {/* {Array.isArray((question as IQuestion).option) && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-foreground mb-2">
                              Options:
                            </p>
                            <ul className="space-y-1">
                              {((question as IQuestion).option as string[]).map(
                                (option: string, optionIndex: number) => (
                                  <li
                                    key={optionIndex}
                                    className={`text-sm px-3 py-2 rounded ${
                                      option === question.correct_answer
                                        ? "bg-green-50 text-green-800 border border-green-200"
                                        : "bg-gray-50 text-foreground"
                                    }`}
                                  >
                                    {String.fromCharCode(65 + optionIndex)}.{" "}
                                    {option}
                                    {option === question.correct_answer && (
                                      <span className="ml-2 text-green-600 font-medium">
                                        ✓ Correct
                                      </span>
                                    )}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )} */}

                        {!Array.isArray((question as IQuestion).options) && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-foreground">
                              Correct Answer:
                            </p>
                            <p className="text-sm bg-green-50 text-green-800 px-3 py-2 rounded border border-green-200 inline-block">
                              {question.correct_answer_key}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 sm:mt-0 sm:ml-4 flex space-x-2 flex-col sm:flex-row">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="inline-flex items-center justify-center px-3 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors mb-2 sm:mb-0 w-full sm:w-auto">
                              <Edit className="h-4 w-4 mr-1" />
                              Update
                            </button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Update Question</DialogTitle>
                              <DialogDescription>
                                Select correct answer
                              </DialogDescription>
                            </DialogHeader>
                            <EditQuestion id={question._id} />
                          </DialogContent>
                        </Dialog>
                        <button
                          // onClick={() => handleDeleteQuestion(question.id)}
                          className="inline-flex items-center justify-center px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors w-full sm:w-auto"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-opacity-75 backdrop-blur-sm transition-opacity" />

            <div className="relative inline-block w-full max-w-2xl transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle">
              <div className="bg-white px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Add Questions to Lesson
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    JSON Format Instructions
                  </h4>
                  {selectedLesson?.type === "mixed" && (
                    <Badge variant="destructive" className="mb-4">
                      Mixed type
                    </Badge>
                  )}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                      {jsonInstructionFormat}
                    </pre>
                  </div>
                  <div className="text-xs text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                    <pre>{note}</pre>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Upload JSON File
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">JSON files only</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".json"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                  {uploadedFile && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        Selected file:{" "}
                        <span className="font-medium">{uploadedFile.name}</span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm cursor-pointer font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUploadSubmit}
                    className="px-4 py-2 text-sm cursor-pointer font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Upload Questions"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonDashboard;
