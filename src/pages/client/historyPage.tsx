import { UseCurrentApp } from "@/components/context/app.context";
import coursesService from "@/services/courses.service";
import paymentService from "@/services/payment.service";
import React, { useState, useEffect } from "react";
import formation from "@/utils/format";

const HistoryPage: React.FC = () => {
  const [listCourses, setListCourses] = useState<ICourses[] | []>([]);
  const [listPayment, setListPayment] = useState<IPayment[]>([]);
  const { user } = UseCurrentApp();

  useEffect(() => {
    const fetchPayment = async () => {
      if (!user || !user._id) return;
      const result = await paymentService.getPaymentByUserIdAPI(user._id);
      setListPayment(result.data || []);
    };
    fetchPayment();
  }, [user]);

  useEffect(() => {
    const fetchCoursesPaid = async () => {
      const data = await coursesService.getAllCoursesAPI();
      setListCourses(data.data || []);
    };
    fetchCoursesPaid();
  }, []);

  const filterCourses = listCourses.filter((course) =>
    listPayment.some((payment) => payment.courseId === course._id)
  );

  const totalSpent = filterCourses.reduce(
    (sum, payment) => sum + (payment.price || 0),
    0
  );

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-foreground mb-4">
            Payment History
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-background border border-border rounded-lg p-4">
              <div className="text-xs text-foreground uppercase tracking-wide">
                Completed Orders
              </div>
              <div className="text-lg font-semibold text-foreground">
                {filterCourses.length}
              </div>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <div className="text-xs text-foreground uppercase tracking-wide">
                Total Spent
              </div>
              <div className="text-lg font-semibold text-foreground">
                {formation.formatPrice(totalSpent)}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Payment History
            </h2>
          </div>

          <div className="bg-background border border-border rounded-lg overflow-hidden">
            <div className="space-y-0">
              {filterCourses.map((course, index) => {
                return (
                  <div
                    key={course._id}
                    className={`p-4 border-b border-border last:border-b-0 ${
                      index % 2 === 0 ? "bg-background" : "bg-background"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {course && (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-sm font-semibold text-foreground">
                              {course?.title || "Unknown Course"}
                            </h3>
                            <div className="text-xs text-gray-500 mt-1">
                              {course?.type} •{" "}
                              {
                                listPayment.find(
                                  (v) => v.courseId === course._id
                                )?.method
                              }{" "}
                              •{" "}
                              {
                                listPayment.find(
                                  (v) => v.courseId === course._id
                                )?.createdAt
                              }
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-foreground mb-1">
                              {formation.formatPrice(totalSpent || 0)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filterCourses.length === 0 && (
              <div className="p-8 text-center text-gray-500 text-sm">
                No payment history found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
