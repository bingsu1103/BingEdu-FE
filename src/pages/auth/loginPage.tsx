import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import authService from "@/services/auth.service";
import { UseCurrentApp } from "@/components/context/app.context";
import { Loader2, Eye, EyeOff, Check, X } from "lucide-react";
import { message } from "antd";
import { FcGoogle } from "react-icons/fc";
import validate from "@/utils/validate";
import logo from "@/assets/binglogo.jpg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setIsAuthenticated, setUser } = UseCurrentApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const logRes = await authService.loginAPI(email, password);
    if (logRes.status) {
      localStorage.setItem("access_token", logRes.data?.access_token || "");
      navigate("/");
      setIsAuthenticated(true);
      message.success("Login successfully!");
    }
    setIsLoading(false);
    setUser(logRes?.data?.user ?? null);
  };
  return (
    <>
      <div className="grid max-sm:grid-cols-1 grid-cols-[4fr_7fr] h-screen relative sm:p-20">
        <div className="max-sm:hidden flex bg-[#E5F6FF] flex-col items-center justify-self-end justify-center w-full sm:rounded-l-2xl">
          <div className="px-10 rounded-2xl">
            <img
              width={400}
              src={logo}
              style={{ clipPath: "inset(1px)" }}
              alt=""
            />
          </div>
        </div>
        <div className="flex w-full justify-center items-center flex-col relative sm:mr-20 sm:border-1 sm:border-[#E5F6FF] sm:rounded-r-2xl">
          <div className="">
            <h1 className="scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance ">
              Log in
            </h1>
          </div>
          <Card className="w-full max-w-sm mt-5">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
              <CardAction>
                <Button
                  variant="link"
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign Up
                </Button>
              </CardAction>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2 relative">
                    <Label htmlFor="email">Email</Label>
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
                      <span className="absolute right-3 top-8 text-sm">
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
                  <div className="grid gap-2 relative">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        tabIndex={-1}
                        to="/forgot-password"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
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
                    />
                    {password && (
                      <span className="absolute right-8 top-[38px] text-sm">
                        {!passwordError ? (
                          <Check className="text-green-500 w-4 h-4 rounded-2xl border-2" />
                        ) : (
                          <X className="text-red-500 w-4 h-4 rounded-2xl border-2" />
                        )}
                      </span>
                    )}
                    <span
                      className="absolute right-3 top-[38px] text-sm cursor-pointer"
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
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2 mt-10">
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="w-full cursor-pointer"
                >
                  {isLoading && (
                    <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                  )}
                  Login
                </Button>
                <Button variant="outline" className="w-full cursor-pointer">
                  <FcGoogle />
                  Login with Google
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
