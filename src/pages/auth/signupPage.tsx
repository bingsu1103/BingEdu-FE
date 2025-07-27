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
import { useNavigate } from "react-router";
import { useState } from "react";
import authService from "@/services/auth.service";
import { Eye, EyeOff, Check, X, Loader2 } from "lucide-react";
import { message } from "antd";
import validate from "@/utils/validate";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      emailError ||
      passwordError ||
      confirmPassword !== password ||
      phoneError ||
      usernameError
    )
      return;

    const res = await authService.signupAPI(email, password, phone, username);
    if (res.status) {
      message.success("Sign up successfully!");
      setIsLoading(false);
      navigate("/login");
    } else {
      message.error(`Sign up failed`);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen items-center pt-15 xs:pt-20 pd:pt-30 lg:pt-30 relative">
        <h1 className="text-center text-2xl font-extrabold tracking-tight pb-5">
          Sign Up
        </h1>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Enter your details below to create an account
            </CardDescription>
            <CardAction>
              <Button
                variant="link"
                className="cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
            </CardAction>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="flex flex-col gap-5">
              {/* Email */}
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
                  className="pr-10"
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

              {/* Username */}
              <div className="grid gap-2 relative">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Your username"
                  value={username}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUsername(value);
                    validate.validateUsername(value, setUsernameError);
                  }}
                  required
                />
                {username && (
                  <span className="absolute right-3 top-8 text-sm">
                    {!usernameError ? (
                      <Check className="text-green-500 w-4 h-4 rounded-2xl border-2" />
                    ) : (
                      <X className="text-red-500 w-4 h-4 rounded-2xl border-2" />
                    )}
                  </span>
                )}
                {usernameError && (
                  <span className="text-xs text-red-500">{usernameError}</span>
                )}
              </div>

              {/* Phone */}
              <div className="grid gap-2 relative">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Your phone number"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPhone(value);
                    validate.validatePhone(value, setPhoneError);
                  }}
                  required
                />
                {phone && (
                  <span className="absolute right-3 top-8 text-sm">
                    {!phoneError ? (
                      <Check className="text-green-500 w-4 h-4 rounded-2xl border-2" />
                    ) : (
                      <X className="text-red-500 w-4 h-4 rounded-2xl border-2" />
                    )}
                  </span>
                )}
                {phoneError && (
                  <span className="text-xs text-red-500">{phoneError}</span>
                )}
              </div>

              {/* Password */}
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
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
                  <span className="text-xs text-red-500">{passwordError}</span>
                )}
              </div>

              {/* Confirm Password */}
              <div className="grid gap-2 relative">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
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
            </CardContent>
            <CardFooter className="flex-col gap-2 pt-4">
              <Button type="submit" className="w-full cursor-pointer">
                {isLoading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
                Sign Up
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

export default SignupPage;
