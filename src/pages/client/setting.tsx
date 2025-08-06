import { useState } from "react";
import {
  User,
  Bell,
  Lock,
  Mail,
  Phone,
  MapPin,
  Globe,
  Shield,
  Save,
  Eye,
  EyeOff,
  Moon,
  Sun,
} from "lucide-react";
import { UseTheme } from "@/components/context/theme.context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import userService from "@/services/user.service";
import { message } from "antd";

interface ISettingUser {
  user: IUser | null;
}

const SettingPage: React.FC<ISettingUser> = ({ user }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState<string>(user?.phone || "");
  const [name, setName] = useState<string>(user?.name || "");
  const [location, setLocation] = useState<string>(user?.location || "");
  const { setTheme } = UseTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: true,
  });

  const [preferences, setPreferences] = useState({
    language: "vi",
    theme: "light",
    autoplay: true,
    quality: "auto",
  });

  const handleNotificationChange = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const handleSubmit = async () => {
    try {
      await userService.updateUserAPI({
        id: user?._id,
        name,
        phone,
        location,
      });
    } catch (error) {
      console.log(error);
      message.error("Update failed");
    }
  };

  const ToggleSwitch = ({
    enabled,
    onChange,
  }: {
    enabled: boolean;
    onChange: () => void;
  }) => (
    <button
      onClick={onChange}
      className={`w-12 h-6 rounded-full transition-colors duration-200 ${
        enabled ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-5 h-5 bg-background rounded-full transition-transform duration-200 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-background shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Account Setting
            </h1>
            <p className="text-foreground">
              Manage account and private setting
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <form className="bg-background rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <User size={20} className="text-foreground" />
                <h3 className="text-lg font-semibold text-foreground">
                  Basic Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <Input
                      disabled
                      type="email"
                      defaultValue={user?.email || ""}
                      className="w-full pl-10 pr-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Type
                  </label>
                  <Input
                    disabled
                    type="text"
                    defaultValue={user?.type}
                    className="w-full p-2 border  border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    value={name}
                    defaultValue={user?.name || ""}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <Input
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      type="tel"
                      defaultValue={user?.phone || "+84 xxx xxx xxx"}
                      className="w-full pl-10 pr-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-3 top-3 text-gray-400"
                    />
                    <textarea
                      defaultValue={user?.location || ""}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      rows={3}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <Save size={16} />
                  Save changes
                </Button>
              </div>
            </form>

            {/* Security Settings */}
            <div className="bg-background rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Lock size={20} className="text-foreground" />
                <h3 className="text-lg font-semibold text-foreground">
                  Security
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Current password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    New password
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Confirm password
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter confirm password"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                <div className="bg-accent border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={16} className="text-blue-600" />
                    <span className="font-medium text-blue-900">
                      2Face Authentication
                    </span>
                  </div>
                  <p className="text-sm text-blue-700 mb-3">
                    Enhance account security with 2-step authentication
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Active
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Notification Settings */}
            <div className="bg-background rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Bell size={20} className="text-foreground" />
                <h3 className="text-lg font-semibold text-foreground">
                  Notification
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-foreground">Email</span>
                    <p className="text-sm text-foreground">
                      Received message from email
                    </p>
                  </div>
                  <ToggleSwitch
                    enabled={notifications.email}
                    onChange={() => handleNotificationChange("email")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-foreground">SMS</span>
                    <p className="text-sm text-foreground">Nhận tin nhắn SMS</p>
                  </div>
                  <ToggleSwitch
                    enabled={notifications.sms}
                    onChange={() => handleNotificationChange("sms")}
                  />
                </div>
              </div>
            </div>

            {/* Language & Theme */}
            <div className="bg-background rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Globe size={20} className="text-foreground" />
                <h3 className="text-lg font-semibold text-foreground">
                  Interface
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Theme
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setTheme("light")}
                      className={`p-2 flex items-center gap-3 border rounded-lg text-sm font-medium transition-colors ${
                        preferences.theme === "light"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <Sun></Sun>
                      <span>Light</span>
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={`p-2 flex items-center gap-3 border rounded-lg text-sm font-medium transition-colors ${
                        preferences.theme === "dark"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <Moon></Moon>
                      <span>Dark</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-background rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Tài khoản
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors text-foreground">
                  Xuất dữ liệu cá nhân
                </button>
                <button className="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors text-foreground">
                  Tạm khóa tài khoản
                </button>
                <button className="w-full text-left p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600">
                  Xóa tài khoản vĩnh viễn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
