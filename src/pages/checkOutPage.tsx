import { CourseCard } from "@/components/ui/coursesCard";
import coursesService from "@/services/courses.service";
import { useEffect, useState } from "react";

const CheckOutPage = () => {
  const [listCourses, setListCourses] = useState<ICourses[]>([]);
  useEffect(() => {
    const fetchAllCourses = async () => {
      const result = await coursesService.getAllCoursesAPI();
      setListCourses(result?.data || []);
    };
    fetchAllCourses();
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              High-Quality Exam Preparation Courses
            </h1>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Improve your skills with courses designed by leading experts
            </p>
          </div>

          <div
            className="
                grid gap-6
                grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                auto-rows-[minmax(0,1fr)]
                items-stretch
              "
          >
            {listCourses.map((c) => (
              <div key={c._id} className="h-full">
                <CourseCard course={c} selectedCourses={c} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
