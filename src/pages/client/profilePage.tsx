import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Award,
  Clock,
  Target,
  Camera,
  Play,
  CheckCircle,
  Crown,
  Mail,
  MapPin,
} from "lucide-react";
import userService from "@/services/user.service";
import { message } from "antd";
import coursesService from "@/services/courses.service";
import progressService from "@/services/progress.service";
import uploadService from "@/services/upload.service";
import { UseCurrentApp } from "@/components/context/app.context";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  date?: string;
}
interface IUserProfile {
  user: IUser | null;
}

const ProfilePage: React.FC<IUserProfile> = ({ user }) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [courses, setCourses] = useState<ICourses[]>([]);
  const [avatar, setAvatar] = useState<string>(
    user?.avatar || "https://github.com/shadcn.png"
  );
  const [progress, setProgress] = useState<IProgressCourses[] | null>([]);
  const { setUser } = UseCurrentApp();
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
                    message.error("Failed to update avatar");
                    return;
                  }
                  setAvatar(uploadedUrl);
                  setUser((prev) =>
                    prev ? { ...prev, avatar: uploadedUrl } : prev
                  );
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

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Course",
      description: "Hoàn thành khóa học đầu tiên",
      icon: "🎯",
      earned: true,
      date: "2024-01-15",
    },
    {
      id: "2",
      title: "Speed Learner",
      description: "Hoàn thành 5 khóa học trong 1 tháng",
      icon: "⚡",
      earned: true,
      date: "2024-02-20",
    },
    {
      id: "3",
      title: "English Master",
      description: "Hoàn thành 10 khóa học tiếng Anh",
      icon: "📚",
      earned: true,
      date: "2024-03-10",
    },
    {
      id: "4",
      title: "Streak Champion",
      description: "Học liên tục 30 ngày",
      icon: "🔥",
      earned: false,
    },
  ];

  type StatCardColor = "blue" | "green" | "orange" | "purple";
  interface StatCardProps {
    icon: React.ElementType;
    label: string;
    value: React.ReactNode;
    color?: StatCardColor;
  }
  const StatCard: React.FC<StatCardProps> = ({
    icon: Icon,
    label,
    value,
    color = "blue",
  }) => {
    const colorClasses: Record<StatCardColor, string> = {
      blue: "bg-blue-50 text-blue-600 border-blue-200",
      green: "bg-green-50 text-green-600 border-green-200",
      orange: "bg-orange-50 text-orange-600 border-orange-200",
      purple: "bg-purple-50 text-purple-600 border-purple-200",
    };

    return (
      <div className="bg-background rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
        <div
          className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
        >
          <Icon size={24} />
        </div>
        <div className="text-foreground font-bold mb-1">{value}</div>
        <div className="text-foreground text-sm">{label}</div>
      </div>
    );
  };

  const CourseCard = ({
    course,
  }: {
    course: ICourses;
    showProgress?: boolean;
  }) => {
    return (
      <div className="bg-background rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
        <div className="relative overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {course.title && (
            <div className="absolute top-3 right-3">
              <div className="bg-yellow-400 p-1.5 rounded-full">
                <Award size={14} className="text-white" />
              </div>
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="font-semibold truncate text-foreground mb-2 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>

          <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
            {progress
              ?.filter((v) => v.coursesId === course._id)
              .find((v) => v.completed) ? (
              <>
                <Award size={16} />
                Xem chứng chỉ
              </>
            ) : (
              <>
                <Play size={16} />
                Tiếp tục học
              </>
            )}
          </button>
          <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
            {progress
              ?.filter((v) => v.coursesId === course._id)
              .find((v) => v.completed) && (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle size={14} />
                Hoàn thành
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const AchievementBadge = ({ achievement }: { achievement: Achievement }) => (
    <div
      className={`bg-background rounded-xl p-4 border-2 transition-all duration-300 ${
        achievement.earned
          ? "border-yellow-200 shadow-sm hover:shadow-md"
          : "border-gray-200 opacity-60"
      }`}
    >
      <div className="text-center">
        <div className={`text-3xl mb-2 ${!achievement.earned && "grayscale"}`}>
          {achievement.icon}
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">
          {achievement.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
        {achievement.earned && achievement.date && (
          <p className="text-xs text-gray-500">
            Đạt được: {new Date(achievement.date).toLocaleDateString("vi-VN")}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background rounded-2xl">
      {/* Header */}
      <div className="bg-background shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <img
                  className="rounded-full border-4 border-white shadow-lg object-cover"
                  width={140}
                  height={140}
                  src={avatar}
                  alt="User Avatar"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute -bottom-1 right-2 bg-background p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-110 cursor-pointer"
                >
                  <Camera size={19} className="text-foreground" />
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
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {user?.name}
                </h1>
                <p className="text-gray-600 mb-2">
                  Học viên {user?.type} • Tham gia từ {dateString}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Mail size={16} />
                    {user?.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    {user?.location}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl">
                <Crown size={16} />
                Upgrade to VIP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <StatCard
              icon={BookOpen}
              label="Khóa học đã hoàn thành"
              value={progress?.filter((v) => v.completed).length}
              color="blue"
            />
            <StatCard
              icon={Play}
              label="Khóa học hiện tại"
              value={progress?.length}
              color="green"
            />
            <StatCard
              icon={Clock}
              label="Tổng thời gian học"
              value={`${0}h`}
              color="orange"
            />
            <StatCard
              icon={Award}
              label="Chứng chỉ"
              value={progress?.filter((v) => v.completed).length}
              color="purple"
            />
            <StatCard
              icon={Target}
              label="Mục tiêu tháng"
              value="85%"
              color="blue"
            />
          </div>

          {/* Current Courses */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                Khóa học hiện tại
              </h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Xem tất cả
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">
              Thành tích gần đây
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements
                .filter((a) => a.earned)
                .slice(0, 4)
                .map((achievement) => (
                  <AchievementBadge
                    key={achievement.id}
                    achievement={achievement}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
