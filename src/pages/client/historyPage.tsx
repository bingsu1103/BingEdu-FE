import { useCurrentApp } from "@/components/context/app.context";
import coursesService from "@/services/courses.service";
import paymentService from "@/services/payment.service";
import React, { useState, useEffect, useMemo } from "react";
import formation from "@/utils/format";
import { Skeleton } from "@/components/ui/skeleton";

const HistoryPage: React.FC = () => {
  // ĐỂ SKELETON: dùng null khi chưa fetch xong
  const [listCourses, setListCourses] = useState<ICourses[] | null>(null);
  const [listPayment, setListPayment] = useState<IPayment[] | null>(null);
  const { user } = useCurrentApp();

  useEffect(() => {
    const fetchPayment = async () => {
      if (!user || !user._id) {
        setListPayment([]); // không có user → không có thanh toán
        return;
      }
      const result = await paymentService.getPaymentByUserIdAPI(user._id);
      setListPayment(result?.data ?? []);
    };
    fetchPayment();
  }, [user]);

  useEffect(() => {
    const fetchCoursesPaid = async () => {
      const data = await coursesService.getAllCoursesAPI();
      setListCourses(data?.data ?? []);
    };
    fetchCoursesPaid();
  }, []);

  // Lọc các course đã thanh toán — null = đang loading
  const filterCourses = useMemo(() => {
    if (!listCourses || !listPayment) return null; // loading
    return listCourses.filter((course) =>
      listPayment.some((payment) => payment.courseId === course._id)
    );
  }, [listCourses, listPayment]);

  // Tổng số tiền đã chi (nên tính theo listPayment thay vì course)
  const totalSpent = useMemo(() => {
    if (!listPayment) return 0; // loading → 0 (không dùng để render chính)
    return listPayment
      .filter((p) => p.status === "paid")
      .reduce((sum, p) => sum + Number(p.total ?? 0), 0);
  }, [listPayment]);

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
            {/* Completed Orders */}
            <div className="bg-background border border-border rounded-lg p-4">
              <div className="text-xs text-foreground uppercase tracking-wide">
                Completed Orders
              </div>
              {!filterCourses ? (
                <Skeleton className="h-6 w-16 mt-2" />
              ) : (
                <div className="text-lg font-semibold text-foreground mt-2">
                  {filterCourses.length}
                </div>
              )}
            </div>

            {/* Total Spent */}
            <div className="bg-background border border-border rounded-lg p-4">
              <div className="text-xs text-foreground uppercase tracking-wide">
                Total Spent
              </div>
              {!listPayment ? (
                <Skeleton className="h-6 w-28 mt-2" />
              ) : (
                <div className="text-lg font-semibold text-foreground mt-2">
                  {formation.formatPrice(totalSpent)}
                </div>
              )}
            </div>

            {/* Phần trống (hoặc có thể thêm “Paid methods”) */}
            <div className="bg-background border border-border rounded-lg p-4">
              <div className="text-xs text-foreground uppercase tracking-wide">
                Paid Methods
              </div>
              {!listPayment ? (
                <Skeleton className="h-6 w-24 mt-2" />
              ) : (
                <div className="text-lg font-semibold text-foreground mt-2">
                  {Array.from(
                    new Set(
                      listPayment
                        .filter((p) => p.status === "paid")
                        .map((p) => p.method)
                    )
                  ).join(", ") || "—"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Payment History
          </h2>
        </div>

        {/* List */}
        <div className="bg-background border border-border rounded-lg overflow-hidden">
          <div className="space-y-0">
            {/* LOADING: Skeleton list */}
            {!filterCourses ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="p-4 border-b border-border last:border-b-0"
                >
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-16 h-12 rounded" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Skeleton className="h-4 w-56 mb-2" />
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-3 w-28" />
                          </div>
                        </div>
                        <Skeleton className="h-5 w-24" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : filterCourses.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">
                No payment history found
              </div>
            ) : (
              filterCourses.map((course) => {
                const payment = (listPayment ?? [])
                  .filter((p) => p.courseId === course._id)
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt ?? 0).getTime() -
                      new Date(a.createdAt ?? 0).getTime()
                  )[0];

                const priceToShow = Number(payment.total ?? course.price ?? 0);
                const method = payment?.method ?? "—";
                const createdAt = payment?.createdAt
                  ? new Date(payment.createdAt).toLocaleString("vi-VN")
                  : "—";

                return (
                  <div
                    key={course._id}
                    className="p-4 border-b border-border last:border-b-0"
                  >
                    <div className="flex items-center gap-4">
                      {course?.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-12 rounded bg-muted" />
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="text-sm font-semibold text-foreground truncate">
                              {course?.title || "Unknown Course"}
                            </h3>
                            <div className="text-xs text-muted-foreground mt-1 flex flex-wrap gap-x-2">
                              <span className="truncate">{course?.type}</span>
                              <span>•</span>
                              <span className="truncate">{method}</span>
                              <span>•</span>
                              <span className="truncate">{createdAt}</span>
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <div className="text-sm font-semibold text-foreground mb-1 whitespace-nowrap">
                              {formation.formatPrice(priceToShow)}
                            </div>
                            {payment?.status && (
                              <div
                                className={`text-[11px] font-medium ${
                                  payment.status === "paid"
                                    ? "text-green-600"
                                    : payment.status === "pending"
                                    ? "text-amber-600"
                                    : "text-red-600"
                                }`}
                              >
                                {payment.status.toUpperCase()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
