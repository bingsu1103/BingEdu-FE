import authService from "@/services/auth.service";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, X, Eye, EyeOff } from "lucide-react";
import { FaUnlock } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import { message } from "antd";
import validate from "@/utils/validate";

const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const { email } = location.state || {};

  useEffect(() => {
    const verify_token = sessionStorage.getItem("verify_otp") || "";

    const checkPermission = async () => {
      const permission = await authService.checkPermissionAPI(
        verify_token || ""
      );
      if (!permission.status) {
        navigate("/forgot-password");
      }
    };
    checkPermission();
  }, [navigate]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const newPassword = password;
    const verify_token = sessionStorage.getItem("verify_otp") || "";
    const resetReq = await authService.resetPasswordAPI(
      email,
      newPassword,
      verify_token
    );
    if (!resetReq.status) {
      message.error("Some thing went wrong. Please try again");
      setIsLoading(false);
    } else {
      message.success("Reset password successfully!");
      navigate("/login");
      sessionStorage.removeItem("verify_otp");
    }
  };
  return (
    <>
      <div className="flex flex-col h-screen items-center pt-20 md:pt-30 lg:pt-35 relative">
        <h1 className="scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance ">
          Reset Password
        </h1>
        <Card className="w-full max-w-sm mt-5">
          <CardHeader className="flex justify-center">
            <div className="border-2 w-fit p-5 rounded-full">
              <FaUnlock className="text-5xl" />
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="flex flex-col gap-6">
                <h4 className="scroll-m-20 text-md font-semibold tracking-tight text-center">
                  Unlock your account
                </h4>
                <p className="leading-5 [&:not(:first-child)]:mt-6 text-sm">
                  Enter your new password to request an update
                </p>
                <div className="grid gap-2 relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    disabled
                    required
                  />
                </div>
                <div className="grid gap-2 relative">
                  <Label htmlFor="password">New password</Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPassword(value);
                      validate.validatePassword(value, setPasswordError);
                    }}
                    required
                    className="pr-16"
                  />
                  {password && (
                    <span className="absolute right-8 top-8 text-sm">
                      {!passwordError ? (
                        <Check className="text-green-500 w-4 h-4 rounded-2xl border-2" />
                      ) : (
                        <X className="text-red-500 w-4 h-4 rounded-2xl border-2" />
                      )}
                    </span>
                  )}
                  <span
                    className="absolute right-3 top-8 text-sm cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-500" />
                    )}
                  </span>
                  {passwordError && (
                    <span className="text-xs text-red-500">
                      {passwordError}
                    </span>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="grid gap-2 relative">
                  <Label htmlFor="confirmPassword">Confirm new password</Label>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pr-16"
                  />
                  {confirmPassword && (
                    <span className="absolute right-8 top-8 text-sm">
                      {confirmPassword === password ? (
                        <Check className="text-green-500 w-4 h-4 rounded-2xl border-2" />
                      ) : (
                        <X className="text-red-500 w-4 h-4 rounded-2xl border-2" />
                      )}
                    </span>
                  )}
                  <span
                    className="absolute right-3 top-8 text-sm cursor-pointer"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-500" />
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 mt-5">
              <Button disabled={isLoading} className="w-full cursor-pointer">
                Submit
              </Button>
            </CardFooter>
          </form>
        </Card>
        <div className="flex flex-col items-center justify-center absolute bottom-0 p-1">
          <span className="text-xs">
            This site is protected by Google Privacy Policy and Terms of Service
            apply.
          </span>
        </div>
      </div>
    </>
  );
};
export default ResetPasswordPage;
