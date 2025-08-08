import React from "react";
import { XCircle, Home, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "./button";

export const PaymentFailed: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto bg-background text-center">
      <div className="bg-background border border-border rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Payment Failed!
          </h1>
          <p className="text-foreground/70">
            Unfortunately, your payment could not be processed. Please try again
            or contact support.
          </p>
        </div>

        {/* Error Details */}
        <div className="border border-red-200 bg-red-50 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <XCircle className="w-6 h-6 text-red-500 mr-2" />
            <h2 className="text-lg font-semibold text-red-700">
              Payment Error
            </h2>
          </div>
          <div className="space-y-2 text-center">
            <p className="text-red-600 text-sm">
              Your payment was not successful. This could be due to:
            </p>
            <ul className="text-red-600 text-sm space-y-1">
              <li>• Insufficient funds</li>
              <li>• Expired card information</li>
              <li>• Network connection issues</li>
              <li>• Bank security restrictions</li>
            </ul>
          </div>
        </div>

        {/* Support Info */}
        <div className="border border-border rounded-lg p-6 mb-8 text-center">
          <h3 className="text-foreground font-semibold mb-2">Need Help?</h3>
          <p className="text-foreground/70 text-sm mb-4">
            If you continue to experience issues, please contact our support
            team.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-foreground/70">Email:</span>
              <span className="text-foreground">bingsuedu@gmail.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/70">Phone:</span>
              <span className="text-foreground">+84 775 510 335</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/70">Time:</span>
              <span className="text-foreground">
                {new Date().toLocaleString("vi-VN")}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={() => navigate(-1)}
            className="cursor-pointer flex-1 bg-red-500 hover:bg-red-600 py-6 px-6 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center text-white"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/courses")}
            className="cursor-pointer flex-1 border border-border py-6 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center text-foreground hover:bg-foreground/5"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Courses
          </Button>
        </div>
      </div>
    </div>
  );
};
