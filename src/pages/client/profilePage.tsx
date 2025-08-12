import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Award,
  Camera,
  Play,
  CheckCircle,
  Crown,
  Mail,
  MapPin,
} from "lucide-react";

// services & context
import userService from "@/services/user.service";
import coursesService from "@/services/courses.service";
import progressService from "@/services/progress.service";
import uploadService from "@/services/upload.service";
import { useCurrentApp } from "@/components/context/app.context";

// shadcn/ui primitives
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import paymentService from "@/services/payment.service";
import { Link } from "react-router";

interface IUserProfile {
  user: IUser | null;
}

const ProfilePage: React.FC<IUserProfile> = ({ user }) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [courses, setCourses] = useState<ICourses[]>([]);
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [avatar, setAvatar] = useState<string>(
    user?.avatar || "https://github.com/shadcn.png"
  );
  const [progress, setProgress] = useState<IProgressCourses[] | null>([]);
  const { setUser } = useCurrentApp();

  const dateString = user?.createdAt
    ? new Date(user.createdAt).toISOString().split("T")[0]
    : "";

  useEffect(() => {
    const fetchProgress = async () => {
      if (user?._id) {
        const progressRes = await progressService.getCourseProgressByUserAPI(
          user._id
        );
        setProgress(progressRes.data || []);
      }
    };
    fetchProgress();
  }, [user?._id]);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesRes = await coursesService.getAllCoursesAPI();
      const listCourses = coursesRes.data;
      setCourses(listCourses || []);
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      const paymentRes = await paymentService.getPaymentByUserIdAPI(
        user?._id || ""
      );
      const listPayments = paymentRes.data;
      setPayments(listPayments || []);
    };
    fetchPayments();
  });

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const img = new Image();
        const reader = new FileReader();
        reader.onload = () => {
          img.src = reader.result as string;

          img.onload = async () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const size = 140;

            canvas.width = size;
            canvas.height = size;

            const imgSize = Math.min(img.width, img.height);
            const offsetX = (img.width - imgSize) / 2;
            const offsetY = (img.height - imgSize) / 2;

            if (ctx) {
              ctx.drawImage(
                img,
                offsetX,
                offsetY,
                imgSize,
                imgSize,
                0,
                0,
                size,
                size
              );
              canvas.toBlob(async (blob) => {
                if (blob) {
                  const fileToUpload = new File([blob], "avatar.png", {
                    type: "image/png",
                  });
                  const response = await uploadService.uploadAvatar(
                    fileToUpload
                  );
                  const uploadedUrl = response.data.url;
                  const data = { id: user?._id, avatar: uploadedUrl };
                  const avatarRes = await userService.updateUserAPI(data);
                  if (!avatarRes.status) {
                    alert("Failed to update avatar");
                    return;
                  }
                  setAvatar(uploadedUrl);
                  if (user) {
                    setUser({ ...user, avatar: uploadedUrl });
                  }
                }
              }, "image/png");
            }
          };
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  // Derived values for summaries
  const completedCount = progress?.filter((v) => v.completed).length ?? 0;
  const totalTracked = payments.filter((v) => v.status === "paid")?.length ?? 0;
  const overallPct = totalTracked
    ? Math.round((completedCount / totalTracked) * 100)
    : 0;

  const StatCard = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: React.ElementType;
    label: string;
    value: React.ReactNode;
  }) => (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground`}
        >
          <Icon size={20} />
        </div>
        <div className="mb-1 font-bold text-foreground">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );

  const CourseCard = ({ course }: { course: ICourses }) => {
    const done = !!progress
      ?.filter((v) => v.coursesId === course._id)
      .find((v) => v.completed);
    return (
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="relative">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-44 w-full object-cover"
          />
          {course.title && (
            <Badge className="absolute left-3 top-3" variant="secondary">
              <Award className="mr-1 h-3 w-3" /> Featured
            </Badge>
          )}
        </div>
        <CardContent className="p-5">
          <h3 className="mb-2 line-clamp-1 font-semibold leading-tight">
            {course.title}
          </h3>
          <Button className="mt-2 w-full justify-center gap-2">
            {done ? (
              <>
                <Award className="h-4 w-4" /> View certificate
              </>
            ) : (
              <>
                <Play className="h-4 w-4" /> <Link to="/">Continue</Link>
              </>
            )}
          </Button>
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            {done && (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="h-4 w-4" /> Completed
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  // helpers
  const getCourseTitle = (id?: string) =>
    courses.find((c) => c._id === id)?.title || "Khóa học";

  const completedProgress = (progress || []).filter((p) => p.completed);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-28 w-28 shadow">
                  <AvatarImage src={avatar} alt="User avatar" />
                  <AvatarFallback>
                    {user?.name?.slice(0, 2)?.toUpperCase() || "US"}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="avatar-upload"
                  className="absolute -bottom-2 right-2 cursor-pointer rounded-full border bg-background p-2 shadow-sm transition hover:shadow"
                >
                  <Camera className="h-4 w-4" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept=".png,.jpg"
                  onChange={handleAvatarChange}
                  className="hidden"
                  disabled={uploading}
                />
              </div>

              <div>
                <h1 className="mb-1 text-2xl font-bold">{user?.name}</h1>
                <p className="mb-2 text-sm text-muted-foreground">
                  Student {user?.type} • Active from {dateString}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="h-4 w-4" /> {user?.email}
                  </span>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {user?.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button className="gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700">
                <Crown className="h-4 w-4" /> Upgrade to VIP
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Stats Grid (removed total hours & monthly target) */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              icon={BookOpen}
              label="Courses completed"
              value={completedCount}
            />
            <StatCard
              icon={Play}
              label="Current courses"
              value={totalTracked}
            />
            <StatCard
              icon={Award}
              label="Certificates"
              value={completedCount}
            />
          </div>

          {/* Overall progress */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Overview</CardTitle>
              <CardDescription>
                Completion rates are based on the courses you are taking.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Overall progress</span>
                <span className="font-medium">{overallPct}%</span>
              </div>
              <Progress value={overallPct} />
              <p className="mt-2 text-xs text-muted-foreground">
                {completedCount}/{totalTracked} courses completed
              </p>
            </CardContent>
          </Card>

          {/* Current Courses */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Khóa học hiện tại</h2>
              <Button variant="link" className="px-0">
                Xem tất cả
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </section>

          {/* Certificates list (replaces recent achievements) */}
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-bold">Chứng chỉ của bạn</h2>
              <p className="text-sm text-muted-foreground">
                Các khóa học đã hoàn thành gần đây.
              </p>
            </div>

            {completedProgress.length === 0 ? (
              <Alert>
                <AlertTitle>Chưa có chứng chỉ</AlertTitle>
                <AlertDescription>
                  Bắt đầu hoàn thành một khóa học để nhận chứng chỉ đầu tiên của
                  bạn.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {completedProgress.map((p) => (
                  <Card key={p.coursesId}>
                    <CardContent className="flex items-center justify-between gap-4 p-4">
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-yellow-500" />
                        <div>
                          <div className="font-medium leading-tight">
                            {getCourseTitle(p.coursesId)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Đã hoàn thành
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Xem chứng chỉ
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
