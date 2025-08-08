import React, { useEffect, useState } from "react";
import { CreditCard, Smartphone } from "lucide-react";
import { useParams } from "react-router";
import coursesService from "@/services/courses.service";
import { Button } from "./button";
import paymentService from "@/services/payment.service";

export const CheckoutForm: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState<string>("momo");
  const [course, setSelectedCourse] = useState<ICourses | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<string>();

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await coursesService.getCourseAPI(id || "");
      setSelectedCourse(result?.data || null);
    };
    fetchCourses();
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleConfirmPayment = async () => {
    setIsLoading(true);
    if (course?.price !== undefined && course?._id) {
      const VNPresponse = await paymentService.createVNPUrlAPI(
        course.price,
        course._id
      );
      if (VNPresponse.status) {
        setIsLoading(false);
        window.location.assign(VNPresponse.data || "");
      }
    }
  };

  const paymentMethods = [
    {
      id: "momo" as string,
      name: "MoMo",
      description: "Payment via MoMo e-wallet",
      icon: Smartphone,
      color: "text-momo",
      bgColor: "#FCEAF3",
      borderColor: "#F4B4D5",
    },
    {
      id: "vnpay" as string,
      name: "VNPay",
      description: "Payment via VNPay gateway",
      icon: CreditCard,
      color: "text-vnpay",
      bgColor: "#E9EBF7",
      borderColor: "#ACB7E3",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto bg-background">
      <div className="bg-background border border-border rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-foreground mb-8">
          Payment Information
        </h1>

        {/* Course Summary */}
        <div className="border border-border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Selected course
          </h2>
          <div className="flex gap-4">
            <img
              src={course?.thumbnail || ""}
              alt={course?.title || ""}
              className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="text-foreground font-medium mb-2 line-clamp-2">
                {course?.title}
              </h3>
              <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                {course?.type}
              </span>
            </div>
            <div className="text-right">
              <p className="text-foreground/70 text-sm">Price</p>
              <p className="text-xl font-bold text-primary">
                {formatPrice(Number(course?.price))}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Payment method
          </h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <label
                  key={method.id}
                  className={`
                    block cursor-pointer transition-all duration-200
                    ${
                      selectedPayment === method.id
                        ? `border-2 ${method.borderColor} ${method.bgColor}`
                        : "border border-border"
                    }
                    rounded-lg p-4
                  `}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={selectedPayment === method.id}
                    onChange={(e) =>
                      setSelectedPayment(e.target.value as string)
                    }
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div
                      className={`
                      flex items-center justify-center w-12 h-12 rounded-lg mr-4
                      ${method.bgColor}
                    `}
                    >
                      <Icon className={`w-6 h-6 ${method.color}`} />
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold">
                        {method.name}
                      </h3>
                      <p className="text-foreground/70 text-sm">
                        {method.description}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <div
                        className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${
                          selectedPayment === method.id
                            ? `${method.borderColor} ${method.bgColor}`
                            : "border-border"
                        }
                      `}
                      >
                        {selectedPayment === method.id && (
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

        {/* Order Summary */}
        <div className="border-t border-border pt-6 mb-8">
          <div className="flex justify-between items-center text-lg">
            <span className="text-foreground font-semibold">Total:</span>
            <span className="text-2xl font-bold text-primary">
              {formatPrice(Number(course?.price))}
            </span>
          </div>
        </div>

        {/* Confirm Button */}
        <Button
          onClick={handleConfirmPayment}
          disabled={isLoading}
          className={`
            w-full py-6 px-6 font-semibold transition-all duration-200
            ${
              isLoading
                ? "cursor-not-allowed"
                : "hover:shadow-lg transform hover:-translate-y-0.5"
            }
          `}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            `Pay ${formatPrice(Number(course?.price))} via ${
              selectedPayment === "momo" ? "MoMo" : "VNPay"
            }`
          )}
        </Button>

        <p className="text-center text-foreground/70 text-sm mt-4">
          By clicking to pay, you agree to our terms of use
        </p>
      </div>
    </div>
  );
};
