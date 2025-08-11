import React, { useEffect, useState } from "react";
import { CheckCircle, Download, BookOpen } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import coursesService from "@/services/courses.service";
import { Button } from "./button";
import paymentService from "@/services/payment.service";
import { Skeleton } from "./skeleton";

export const PaymentSuccess: React.FC = () => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const { id } = useParams<string>();
  const [course, setCourses] = useState<ICourses | null>(null);
  const [courseID, setCourseID] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayment = async () => {
      const result = await paymentService.getPaymentAPI(id!);
      setCourseID(result.data?.courseId || "");
    };
    fetchPayment();
  }, [id]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await coursesService.getCourseAPI(courseID || "");
      setCourses(result?.data || null);
    };
    fetchCourses();
  }, [courseID]);

  return (
    <div className="max-w-2xl mx-auto bg-background text-center max-sm:px-4">
      <div className="bg-background border border-border rounded-xl shadow-lg p-8">
        {/* Success Icon + Title */}
        {!course ? (
          <div className="mb-8 w-full min-w-full sm:min-w-[520px] md:min-w-[560px] lg:min-w-[600px]">
            <Skeleton className="w-20 h-20 mx-auto mb-4 rounded-full" />
            <Skeleton className="h-8 w-64 mx-auto mb-2 rounded" />
            <Skeleton className="h-4 w-80 mx-auto rounded" />
          </div>
        ) : (
          <div className="mb-8 w-full min-w-full sm:min-w-[520px] md:min-w-[560px] lg:min-w-[600px]">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Payment successfully!
            </h1>
            <p className="text-foreground/70">
              Thank you for purchasing our course. You can start learning now!
            </p>
          </div>
        )}

        {/* Transaction Details */}
        <div className="border border-border rounded-lg p-6 mb-8 text-left w-full min-w-full sm:min-w-[520px] md:min-w-[560px] lg:min-w-[600px]">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {!course ? (
              <Skeleton className="w-40 h-6"></Skeleton>
            ) : (
              "Transaction detail"
            )}
          </h2>
          {!course ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-foreground/70">Courses:</span>
                <span className="text-foreground font-medium truncate max-w-[180px] sm:max-w-[320px]">
                  {course.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Total:</span>
                <span className="text-foreground font-bold">
                  {formatPrice(Number(course.price))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Time:</span>
                <span className="text-foreground font-medium">
                  {new Date().toLocaleString("vi-VN")}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="border border-border rounded-lg p-6 mb-8 w-full min-w-full sm:min-w-[520px] md:min-w-[560px] lg:min-w-[600px]">
          {!course ? (
            <div className="flex gap-4">
              <Skeleton className="w-24 h-24 rounded-lg flex-shrink-0" />
              <div className="flex-1 text-left space-y-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 text-left">
                <h3 className="text-foreground font-semibold mb-2">
                  {course.title}
                </h3>
                <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-sm mb-2">
                  {course.type}
                </span>
                {course.description && (
                  <p className="text-foreground/70 text-sm line-clamp-2">
                    {course.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full min-w-full sm:min-w-[520px] md:min-w-[560px] lg:min-w-[600px]">
          {!course ? (
            <div className="flex gap-4">
              <Skeleton className="h-14 flex-1 rounded-lg" />
              <Skeleton className="h-14 flex-1 rounded-lg" />
            </div>
          ) : (
            <div className="flex gap-4">
              <Button
                onClick={() => navigate("/courses")}
                className="cursor-pointer flex-1 py-6 px-6 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Learning now
              </Button>
              <Button
                variant="outline"
                className="cursor-pointer flex-1 border border-border py-6 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Download invoice
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
