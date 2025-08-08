import React from "react";
import { Button } from "./button";
import { useNavigate } from "react-router";
interface CourseCardProps {
  course: ICourses;
  selectedCourses: ICourses;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  selectedCourses,
}) => {
  const navigate = useNavigate();
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="bg-background border border-border rounded-xl shadow-lg overflow-hidden max-w-md mx-auto">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-background text-foreground px-3 py-1 rounded-full text-sm font-medium">
            {course.type}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-foreground text-xl font-bold mb-3 line-clamp-2 truncate">
          {course.title}
        </h3>

        {course.description && (
          <p className="text-foreground/70 text-sm mb-4 line-clamp-3 truncate">
            {course.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-6">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(course.price)}
          </span>
        </div>

        <Button
          onClick={() => {
            navigate(`/checkout/${selectedCourses._id}`);
          }}
          className="cursor-pointer w-full bg-primary hover:bg-primary-hover py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Mua khóa học ngay
        </Button>
      </div>
    </div>
  );
};
