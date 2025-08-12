import React from "react";
import { Button } from "./button";
import { useNavigate } from "react-router";
import { UseCurrentApp } from "../context/app.context";
import { message } from "antd";
import { Skeleton } from "@/components/ui/skeleton";
interface CourseCardProps {
  course: ICourses;
  selectedCourses: ICourses;
  listPayment: IPayment[];
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  selectedCourses,
  listPayment,
}) => {
  const navigate = useNavigate();
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const { isAuthenticated } = UseCurrentApp();

  return (
    <div className="max-w-md mx-auto">
      {!course || !listPayment ? (
        // SKELETON CARD
        <div className="bg-background border border-border rounded-xl shadow-lg overflow-hidden">
          <div className="relative">
            {/* Ảnh */}
            <Skeleton className="w-full h-48" />
            {/* Badge */}
            <div className="absolute top-4 left-4">
              <Skeleton className="h-7 w-24 rounded-full" />
            </div>
          </div>

          <div className="p-6">
            {/* Title */}
            <Skeleton className="h-6 w-4/5 mb-2 rounded" />
            <Skeleton className="h-6 w-2/3 mb-3 rounded" />

            {/* Description */}
            <div className="mb-4 space-y-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-11/12 rounded" />
              <Skeleton className="h-4 w-4/5 rounded" />
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-7 w-24 rounded" />
            </div>

            {/* Button */}
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>
        </div>
      ) : (
        // DATA CARD
        <div className="bg-background border border-border rounded-xl shadow-lg overflow-hidden">
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
            {!listPayment ? (
              <Skeleton className="h-11 w-full rounded-lg" />
            ) : listPayment.find(
                (v) => v.courseId === course._id && v.status === "paid"
              ) ? (
              <Button
                onClick={() => navigate(`/courses/${course._id}/lesson`)}
                className="cursor-pointer w-full bg-[#34e537] text-black hover:bg-primary-hover py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Available
              </Button>
            ) : (
              <Button
                onClick={() => {
                  if (!isAuthenticated) {
                    message.warning("You need to login!");
                    return;
                  }
                  navigate(`/checkout/${selectedCourses._id}`);
                }}
                className="cursor-pointer w-full bg-primary hover:bg-primary-hover py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Check out
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
