import { UseCurrentApp } from "@/components/context/app.context";
import { CourseCard } from "@/components/ui/coursesCard";
import { Skeleton } from "@/components/ui/skeleton";
import coursesService from "@/services/courses.service";
import paymentService from "@/services/payment.service";
import { useEffect, useState } from "react";

const CheckOutPage = () => {
  const [listCourses, setListCourses] = useState<ICourses[]>([]);
  const [listPayment, setListPayment] = useState<IPayment[]>([]);
  const { user } = UseCurrentApp();
  useEffect(() => {
    const fetchAllCourses = async () => {
      const result = await coursesService.getAllCoursesAPI();
      setListCourses(result?.data || []);
    };
    fetchAllCourses();
  }, []);

  useEffect(() => {
    const fetchPayment = async () => {
      if (!user) return;
      const payment = await paymentService.getPaymentByUserIdAPI(
        user._id || ""
      );
      setListPayment(payment.data || []);
    };
    fetchPayment();
  }, [user]);
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
            {!listCourses?.length
              ? // Skeleton grid
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-full">
                    <div className="bg-background border border-border rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
                      {/* Ảnh */}
                      <Skeleton className="w-full h-48" />

                      {/* Nội dung */}
                      <div className="p-6 flex flex-col flex-1">
                        {/* Title */}
                        <Skeleton className="h-6 w-4/5 mb-2 rounded" />
                        <Skeleton className="h-6 w-2/3 mb-4 rounded" />

                        {/* Description */}
                        <div className="mb-4 space-y-2 flex-1">
                          <Skeleton className="h-4 w-full rounded" />
                          <Skeleton className="h-4 w-11/12 rounded" />
                          <Skeleton className="h-4 w-4/5 rounded" />
                        </div>

                        {/* Price */}
                        <Skeleton className="h-7 w-24 mb-6 rounded" />

                        {/* Button */}
                        <Skeleton className="h-11 w-full rounded-lg" />
                      </div>
                    </div>
                  </div>
                ))
              : listCourses.map((c) => (
                  <div key={c._id} className="h-full">
                    <CourseCard
                      course={c}
                      selectedCourses={c}
                      listPayment={listPayment}
                    />
                  </div>
                ))}
          </div>
          <div>Upgrade to VIP</div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
