import React, { useEffect, useState } from "react";
import data from "@/components/data/data";
import { useParams } from "react-router";
import coursesService from "@/services/courses.service";
import { Button } from "./button";
import paymentService from "@/services/payment.service";
import { UseCurrentApp } from "../context/app.context";
import orderService from "@/services/order.service";
import { UseTheme } from "../context/theme.context";
import formation from "@/utils/format";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export const CheckoutForm: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState<string>("momo");
  const [course, setSelectedCourse] = useState<ICourses | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<string>();
  const { user } = UseCurrentApp();
  const { theme } = UseTheme();

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await coursesService.getCourseAPI(id || "");
      setSelectedCourse(result?.data || null);
    };
    fetchCourses();
  }, [id]);

  const handleConfirmPayment = async () => {
    setIsLoading(true);
    try {
      const userId = user?._id;
      const courseId = course?._id;
      const total = course?.price;

      if (!userId || !courseId || total === undefined) {
        throw new Error("Thiếu thông tin thanh toán");
      }

      // 1) Tạo order
      const orderRes = await orderService.createOrderAPI(
        userId,
        courseId,
        total
      );
      const orderData = orderRes?.data;
      if (!orderData) throw new Error("Tạo order thất bại");

      // 2) Tạo payment
      const paymentRes = await paymentService.createPaymentAPI(
        userId,
        courseId,
        selectedPayment,
        total
      );
      const idToVNPay = paymentRes?.data?._id;
      if (!idToVNPay) throw new Error("Tạo payment thất bại");

      // 3) Lấy VNP URL bằng **id vừa nhận được**, không dùng state
      const vnpRes = await paymentService.createVNPUrlAPI(total, idToVNPay);
      if (vnpRes?.status) {
        window.location.assign(vnpRes.data || "");
      } else {
        throw new Error("Tạo VNP URL thất bại");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-background">
      <div className="bg-background border border-border rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-foreground mb-8">
          Payment Information
        </h1>

        {/* Course Summary */}
        {!course ? (
          <div
            className="
      border border-border rounded-lg p-4 sm:p-6 mb-8 animate-pulse
      w-full
      min-h-[136px] sm:min-h-[150px] md:min-h-[160px]
      /* KHÔNG min-w ở mobile */
      sm:min-w-[520px] md:min-w-[560px] lg:min-w-[600px]
      overflow-hidden
    "
          >
            <Skeleton className="h-6 w-40 mb-4" />
            {/* Mobile: 2 cột | >=sm: 3 cột */}
            <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-4 items-start">
              {/* Image */}
              <Skeleton className="w-16 h-16 sm:w-24 sm:h-24 rounded-lg" />
              {/* Middle (min-w-0 để truncate hoạt động) */}
              <div className="min-w-0">
                <Skeleton className="h-5 mb-2 w-[65%] sm:w-[320px] md:w-[360px] lg:w-[420px] rounded" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              {/* Price column: ẩn mobile, cố định từ sm */}
              <div className="hidden sm:flex sm:flex-col sm:items-end sm:w-[140px] shrink-0">
                <Skeleton className="h-4 w-[88px] mb-2" />
                <Skeleton className="h-6 w-[120px]" />
              </div>
            </div>
          </div>
        ) : (
          <div
            className="
      border border-border rounded-lg p-4 sm:p-6 mb-8
      w-full
      min-h-[136px] sm:min-h-[150px] md:min-h-[160px]
      sm:min-w-[520px] md:min-w-[560px] lg:min-w-[600px]
      overflow-hidden
    "
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Selected course
            </h2>
            <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-4 items-start">
              {/* Image */}
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-16 h-16 sm:w-24 sm:h-24 rounded-lg object-cover"
              />
              {/* Middle */}
              <div className="min-w-0">
                <h3
                  className="text-foreground font-medium mb-2 truncate"
                  title={course.title}
                >
                  {course.title}
                </h3>
                <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                  {course.type}
                </span>
              </div>
              {/* Price column */}
              <div className="hidden sm:flex sm:flex-col sm:items-end sm:w-[140px] shrink-0">
                <p className="text-foreground/70 text-sm">Price</p>
                <p className="text-xl font-bold text-primary truncate max-w-[120px] whitespace-nowrap">
                  {formation.formatPrice(Number(course.price))}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Payment Methods */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">
            Payment method
          </h2>
          <div className="space-y-3">
            {!data?.paymentMethods
              ? // Skeleton – 2 thẻ giống layout thật
                Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border bg-background p-3 sm:p-4 animate-pulse"
                  >
                    <div className="flex items-center">
                      {/* icon box */}
                      <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg mr-3 sm:mr-4" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-28 mb-1" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                      {/* radio */}
                      <Skeleton className="w-5 h-5 rounded-full ml-3" />
                    </div>
                  </div>
                ))
              : data.paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const active = selectedPayment === method.id;
                  return (
                    <label
                      key={method.id}
                      className={`block cursor-pointer transition-all duration-200 rounded-lg p-3 sm:p-4 ${
                        active
                          ? `border-2 ${method.borderColor} ${
                              theme === "light"
                                ? method.bgColor
                                : selectedPayment === "momo"
                                ? "bg-[#ed5bab]"
                                : "bg-[#1A5BAB]"
                            }`
                          : `border border-border bg-background ${
                              theme === "light"
                                ? "hover:bg-gray-100"
                                : "hover:bg-gray-800"
                            }`
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={active}
                        onChange={(e) =>
                          setSelectedPayment(e.target.value as string)
                        }
                        className="sr-only"
                      />
                      <div className="flex items-center">
                        <div
                          className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg mr-3 sm:mr-4 ${method.bgColor}`}
                        >
                          <Icon
                            className={`w-5 h-5 sm:w-6 sm:h-6 ${method.color}`}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm sm:text-base">
                            {method.name}
                          </h3>
                          <p className="text-foreground/70 text-sm">
                            {method.description}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <div
                            className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              active
                                ? `${method.borderColor} ${method.bgColor}`
                                : "border-border"
                            }`}
                          >
                            {active && (
                              <div
                                className={`w-2.5 h-2.5 rounded-full bg-current ${method.color}`}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </label>
                  );
                })}
          </div>
        </div>
        <Alert variant="default">
          <Terminal />
          <AlertTitle>
            Due to VNPay's development mode, please use this test card to make
            payments.
          </AlertTitle>
          <AlertDescription className="mt-2">
            <span className="font-bold text-blue-300">
              Thẻ nội địa và tài khoản ngân hàng
            </span>
            <span>Ngân hàng: NCB</span>
            <span>Số thẻ: 9704198526191432198</span>
            <span>Tên chủ thẻ:NGUYEN VAN A</span>
            <span>Ngày phát hành:07/15 </span>
            <span>Mật khẩu OTP:123456</span>
          </AlertDescription>
        </Alert>

        {/* Order Summary */}
        {!course ? (
          <div className="border-t border-border pt-6 mb-8 animate-pulse">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-6 w-28" />
            </div>
          </div>
        ) : (
          <div className="border-t border-border pt-6 mb-8">
            <div className="flex justify-between items-center text-lg">
              <span className="text-foreground font-semibold">Total:</span>
              <span className="text-2xl font-bold text-primary">
                {formation.formatPrice(Number(course.price))}
              </span>
            </div>
          </div>
        )}

        {/* Confirm Button */}
        {!course ? (
          <div className="animate-pulse">
            <Skeleton className="h-14 w-full rounded-lg" />
          </div>
        ) : (
          <Button
            onClick={handleConfirmPayment}
            disabled={isLoading}
            className={`w-full py-6 px-6 font-semibold transition-all duration-200 cursor-pointer ${
              isLoading
                ? "cursor-not-allowed"
                : "hover:shadow-lg transform hover:-translate-y-0.5"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Processing...
              </div>
            ) : (
              `Pay ${formation.formatPrice(Number(course.price))} via ${
                selectedPayment === "momo" ? "MoMo" : "VNPay"
              }`
            )}
          </Button>
        )}

        <p className="text-center text-foreground/70 text-sm mt-4">
          By clicking to pay, you agree to our terms of use
        </p>
      </div>
    </div>
  );
};
