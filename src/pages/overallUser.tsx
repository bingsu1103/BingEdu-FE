import { useEffect, useMemo, useState } from "react";
import logo from "@/assets/binglogo.jpg";
import {
  UserRoundPen,
  Settings as SettingsIcon,
  LaptopMinimalCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";

import ProfilePage from "@/pages/client/profilePage";
import ResultPage from "@/pages/client/resultPage";
import SettingPage from "@/pages/client/setting";
import { useTheme } from "@/components/context/theme.context";
import { useCurrentApp } from "@/components/context/app.context";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cn(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const OverallUser = () => {
  const [activeTabClient, setActiveTabClient] = useState(
    () => sessionStorage.getItem("activeTabClient") || "profile"
  );
  const { theme } = useTheme();
  const { user } = useCurrentApp();

  useEffect(() => {
    sessionStorage.setItem("activeTabClient", activeTabClient);
  }, [activeTabClient]);

  const tabs = useMemo(
    () => [
      {
        key: "profile",
        label: "Profile",
        icon: UserRoundPen,
        render: () => <ProfilePage user={user} />,
      },
      {
        key: "results",
        label: "Result",
        icon: LaptopMinimalCheck,
        render: () => <ResultPage />,
      },
      {
        key: "settings",
        label: "Setting",
        icon: SettingsIcon,
        render: () => <SettingPage user={user} />,
      },
    ],
    [user]
  );

  return (
    <TooltipProvider>
      <div className="flex h-full w-full">
        {/* Sidebar */}
        <aside
          className={cn(
            "hidden shrink-0 border-r bg-background md:flex md:w-64 md:flex-col md:justify-between",
            theme === "dark" && "border-gray-800"
          )}
        >
          <div className="flex flex-col gap-6 p-4">
            <div className="flex items-center gap-3 px-2">
              <img
                src={logo}
                alt="logo"
                className="h-10 w-10 rounded-2xl object-cover"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-tight">
                  Bing Academy
                </span>
                <span className="text-xs text-muted-foreground">
                  Welcome back{user?.name ? `, ${user.name}` : ""}
                </span>
              </div>
            </div>

            <Separator />

            <nav className="flex flex-col gap-1">
              {tabs.map(({ key, label, icon: Icon }) => {
                const active = activeTabClient === key;
                return (
                  <Button
                    key={key}
                    variant={active ? "default" : "ghost"}
                    className={cn(
                      "justify-start gap-3 w-full",
                      active ? "" : "hover:bg-accent"
                    )}
                    onClick={() => setActiveTabClient(key)}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="truncate">{label}</span>
                  </Button>
                );
              })}
            </nav>
          </div>

          <div className="p-4">
            <Card className="shadow-none">
              <CardContent className="p-4 text-xs text-muted-foreground">
                <p className="leading-relaxed">
                  Theme: <span className="font-medium capitalize">{theme}</span>
                </p>
                <p className="leading-relaxed">Version: 1.0.0</p>
              </CardContent>
            </Card>
          </div>
        </aside>

        <main className="flex min-h-full w-full flex-1 flex-col">
          <div className="flex-1 p-4 md:p-6">
            <Card className="h-full bg-background">
              <CardContent className="h-[calc(100vh-14rem)] p-0 md:h-[calc(100vh-12rem)]">
                <ScrollArea className="h-full p-4">
                  {tabs.find((t) => t.key === activeTabClient)?.render()}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default OverallUser;
