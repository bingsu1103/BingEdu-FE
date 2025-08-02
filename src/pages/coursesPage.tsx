import CourseList from "@/components/test/coursesList";

function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* {currentPage === "courses" ? (
        <CourseList onCourseSelect={handleCourseSelect} />
      ) : (
        <LessonList
          selectedCourse={selectedCourse!}
          onBack={handleBackToCourses}
        />
      )} */}

      <CourseList />
    </div>
  );
}

export default CoursesPage;
