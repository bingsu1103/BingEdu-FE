import { useState } from "react";
import logo from "@/assets/binglogo.jpg";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  UserRoundPen,
  BookmarkCheck,
  Settings,
  CreditCard,
  LaptopMinimalCheck,
} from "lucide-react";

import ProfilePage from "@/pages/client/profilePage";
import MessagePage from "@/pages/client/messagePage";
import ResultPage from "@/pages/client/resultPage";
import SettingPage from "@/pages/client/setting";
import PaymentPage from "@/pages/client/payment";
import { UseTheme } from "@/components/context/theme.context";
import { UseCurrentApp } from "@/components/context/app.context";
import CoursesPage from "@/pages/client/coursesPage";

const OverallUser: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { theme } = UseTheme();
  const { user } = UseCurrentApp();

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfilePage user={user} />;
      case "messages":
        return <MessagePage />;
      case "results":
        return <ResultPage />;
      case "courses":
        return <CoursesPage />;
      case "settings":
        return <SettingPage user={user} />;
      case "payment":
        return <PaymentPage />;
      default:
        return <ProfilePage user={user} />;
    }
  };

  return (
    <>
      <div className="flex-1 h-full grid grid-cols-[1fr_5fr]">
        <div className="flex flex-col items-center gap-10">
          <img width={100} className="rounded-4xl" src={logo} alt="" />
          <div className="flex flex-col items-center gap-2 w-4/5">
            <Button
              className={`w-full flex items-center justify-start gap-3 rounded-md py-2 px-4 cursor-pointer ${
                activeTab === "profile"
                  ? "bg-blue-400 text-white hover:bg-blue-500"
                  : "bg-background text-white hover:bg-gray-300"
              } ${theme === "dark" && "hover:bg-gray-600"}`}
              onClick={() => setActiveTab("profile")}
            >
              <UserRoundPen className="w-5 h-5 text-foreground" />
              <span className="text-foreground">Profile</span>
            </Button>
            <Button
              className={`w-full flex items-center justify-start gap-3 rounded-md py-2 px-4 cursor-pointer ${
                activeTab === "messages"
                  ? "bg-blue-400 text-white hover:bg-blue-500"
                  : "bg-background text-white hover:bg-gray-300"
              } ${theme === "dark" && "hover:bg-gray-600"}`}
              onClick={() => setActiveTab("messages")}
            >
              <MessageCircle className="w-5 h-5 text-foreground" />
              <span className="text-foreground">Message</span>
            </Button>
            <Button
              className={`w-full flex items-center justify-start gap-3 rounded-md py-2 px-4 cursor-pointer ${
                activeTab === "results"
                  ? "bg-blue-400 text-white hover:bg-blue-500"
                  : "bg-background text-white hover:bg-gray-300"
              } ${theme === "dark" && "hover:bg-gray-600"}`}
              onClick={() => setActiveTab("results")}
            >
              <LaptopMinimalCheck className="w-5 h-5 text-foreground" />
              <span className="text-foreground">Result</span>
            </Button>
            <Button
              className={`w-full flex items-center justify-start gap-3 rounded-md py-2 px-4 cursor-pointer ${
                activeTab === "courses"
                  ? "bg-blue-400 text-white hover:bg-blue-500"
                  : "bg-background text-white hover:bg-gray-300"
              } ${theme === "dark" && "hover:bg-gray-600"}`}
              onClick={() => setActiveTab("courses")}
            >
              <BookmarkCheck className="w-5 h-5 text-foreground" />
              <span className="text-foreground">Courses</span>
            </Button>
            <Button
              className={`w-full flex items-center justify-start gap-3 rounded-md py-2 px-4 cursor-pointer ${
                activeTab === "settings"
                  ? "bg-blue-400 text-white hover:bg-blue-500"
                  : "bg-background text-white hover:bg-gray-300"
              } ${theme === "dark" && "hover:bg-gray-600"}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="w-5 h-5 text-foreground" />
              <span className="text-foreground">Setting</span>
            </Button>
            <Button
              className={`w-full flex items-center justify-start gap-3 rounded-md py-2 px-4 cursor-pointer ${
                activeTab === "payment"
                  ? "bg-blue-400 text-white hover:bg-blue-500"
                  : "bg-background text-white hover:bg-gray-300"
              } ${theme === "dark" && "hover:bg-gray-600"}`}
              onClick={() => setActiveTab("payment")}
            >
              <CreditCard className="w-5 h-5 text-foreground" />
              <span className="text-foreground">Payment</span>
            </Button>
          </div>
        </div>
        <div className="bg-background rounded-tl-2xl p-6">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default OverallUser;
