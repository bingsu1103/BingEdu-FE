import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import authService from "@/services/auth.service";
import { Check, X } from "lucide-react";
import { message } from "antd";
import { FaLock } from "react-icons/fa6";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Progress } from "@/components/ui/progress";
import validate from "@/utils/validate";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const startRandomProgress = (duration: number) => {
    return new Promise<void>((resolve) => {
      let currentProgress = 0;
      const intervalTime = 50;
      const steps = Math.ceil(duration / intervalTime);
      const baseIncrement = 100 / steps;
      let stepCount = 0;

      intervalRef.current = setInterval(() => {
        stepCount++;

        const randomFactor = 0.5 + Math.random();
        const increment = baseIncrement * randomFactor;
        currentProgress = Math.min(currentProgress + increment, 100);
        setProgress(currentProgress);

        if (stepCount >= steps || currentProgress >= 100) {
          setProgress(100);
          clearInterval(intervalRef.current!);
          resolve();
        }
      }, intervalTime);
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
    setIsLoading(true);
    const logRes = await authService.forgotPasswordAPI(email);
    if (logRes.status) {
      message.success("OTP sent!");
      setIsLoading(false);
      setIsSendingEmail(true);
    } else {
      message.error("Email not founded. Please try again!");
      setEmail("");
    }
    setIsLoading(false);
  };
  const handleChangeOtp = async (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      const res = await authService.verifyOtpAPI(email, value);
      if (res.status && res.data) {
        sessionStorage.setItem("verify_otp", res.data.verify_token);
        setProgress(0);
        setIsVerifying(true);
        await startRandomProgress(500);
        navigate("/reset-password", { state: { email: email } });
        message.success("OTP verified!");
      }
    }
  };
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  if (isVerifying) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <Progress value={progress} className="w-1/3" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-screen items-center pt-20 md:pt-30 lg:pt-35 relative">
        <h1 className="scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance ">
          Forgot Password
        </h1>
        <Card className="w-full max-w-sm mt-5">
          <CardHeader className="flex justify-center">
            <div className="border-2 w-fit p-5 rounded-full">
              <FaLock className="text-5xl" />
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="flex flex-col gap-6">
                <h4 className="scroll-m-20 text-md font-semibold tracking-tight text-center">
                  Having trouble when logging in?
                </h4>
                <p className="leading-5 [&:not(:first-child)]:mt-6 text-sm">
                  Enter your email and we'll send you a verify code to get back
                  into your account
                </p>
                <div className="grid gap-2 relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEmail(value);
                      validate.validateEmail(value, setEmailError);
                    }}
                    required
                  />
                  {email && (
                    <span className="absolute right-3 top-3 text-sm">
                      {!emailError ? (
                        <Check className="text-green-500 w-4 h-4 rounded-2xl border-2" />
                      ) : (
                        <X className="text-red-500 w-4 h-4 rounded-2xl border-2" />
                      )}
                    </span>
                  )}
                  {emailError && (
                    <span className="text-xs text-red-500">{emailError}</span>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 mt-5">
              <Button disabled={isLoading} className="w-full cursor-pointer">
                Submit
              </Button>
              {!isSendingEmail && <span className="text-sm">OR</span>}
              {!isSendingEmail && (
                <Button
                  onClick={() => navigate("/signup")}
                  variant="outline"
                  className="cursor-pointer"
                >
                  Create new account
                </Button>
              )}
              {isSendingEmail && (
                <div className="mt-5 flex flex-col gap-3 items-center">
                  <h3 className="scroll-m-20 text-sm font-semibold tracking-tight text-center">
                    Please enter the otp sent to your email
                  </h3>
                  <InputOTP
                    value={otp}
                    id="otp"
                    type="otp"
                    maxLength={6}
                    onChange={handleChangeOtp}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
