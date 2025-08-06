import { useState, useEffect } from "react";
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

const OverallUser = () => {
  const [activeTabClient, setActiveTabClient] = useState(() => {
    // Retrieve the saved tab from localStorage, default to "profile" if not found
    return sessionStorage.getItem("activeTabClient") || "profile";
  });
  const { theme } = UseTheme();
  const { user } = UseCurrentApp();

  // Save the active tab to localStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("activeTabClient", activeTabClient);
  }, [activeTabClient]);

  const renderContent = () => {
    switch (activeTabClient) {
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
                activeTabClient === "profile"
                  ? "bg-blue-400 text-white hover:bg-blue-500"
                  : "bg-background text-white hover:bg-gray-300"
              } ${theme === "dark" && "hover:bg-gray-600"}`}
              onClick={() => setActiveTabClient("profile")}
            >
              <UserRoundPen className="w-5 h-5 text-foreground" />
              <span className="text-foreground">Profile</span>
            </Button>
            <Button
              className={`w-full flex items-center justify-start gap-3 rounded-md py-2 px-4 cursor-pointer ${
                activeTabClient === "messages"
                  ? "bg-blue-400 text-white hover:bg-blue-500"
                  : "bg-background text-white hover:bg-gray-300"
              } ${theme === "dark" && "hover:bg-gray-600"}`}
              onClick={() => setActiveTabClient("messages")}
            >
              <MessageCircle className="w-5 h-5 text-foreground" />
              <span className="text-foreground">Message</span>
            </Button>
            <Button
              className={`w-full flex items-center justify-start gap-3 rounded-md py-2 px-4 cursor-pointer ${
                activeTabClient === "results"
                  ? "bg-blue-400 text-white hover:bg-blue-500"
                  : "bg-background text-white hover:bg-gray-300"
              } ${theme === "dark" && "hover:bg-gray-600"}`}
              onClick={() => setActiveTabClient("results")}
            >
              <LaptopMinimalCheck className="w-5 h-5 text-foreground" />
              <span className="text-foreground">Result</span>
            </Button>
            <Button
              className={`w-full flex items-center justify-start gap-3 rounded-md py-2 px-4 cursor-pointer ${
                activeTabClient === "courses"
                  ? "bg-blue-400 text-white hover:bg-blue-500"
                  : "bg-background text-white hover:bg-gray-300"
              } ${theme === "dark" && "hover:bg-gray-600"}`}
              onClick={() => setActiveTabClient("courses")}
            >
              <BookmarkCheck className="w-5 h-5 text-foreground" />
              <span className="text-foreground">Courses</span>
            </Button>
            <Button
              className={`w-full flex items-center justify-start gap-3 rounded-md py-2 px-4 cursor-pointer ${
                activeTabClient === "settings"
                  ? "bg-blue-400 text-white hover:bg-blue-500"
                  : "bg-background text-white hover:bg-gray-300"
              } ${theme === "dark" && "hover:bg-gray-600"}`}
              onClick={() => setActiveTabClient("settings")}
            >
              <Settings className="w-5 h-5 text-foreground" />
              <span className="text-foreground">Setting</span>
            </Button>
            <Button
              className={`w-full flex items-center justify-start gap-3 rounded-md py-2 px-4 cursor-pointer ${
                activeTabClient === "payment"
                  ? "bg-blue-400 text-white hover:bg-blue-500"
                  : "bg-background text-white hover:bg-gray-300"
              } ${theme === "dark" && "hover:bg-gray-600"}`}
              onClick={() => setActiveTabClient("payment")}
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
