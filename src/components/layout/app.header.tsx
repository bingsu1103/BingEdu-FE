import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RiVipDiamondLine } from "react-icons/ri";
import { RiAccountCircle2Fill } from "react-icons/ri";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { UseCurrentApp } from "../context/app.context";
import { Button } from "../ui/button";
import authService from "services/auth.service";
import { MdDashboard } from "react-icons/md";
import logo from "@/assets/binglogo.jpg";
import { MenuOutlined } from "@ant-design/icons";
import { Moon, Sun, Bell } from "lucide-react";
import { UseTheme } from "@/components/context/theme.context";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AppHeader = () => {
  const { setTheme, theme } = UseTheme();
  const navigate = useNavigate();
  const { setIsAuthenticated, user, isAuthenticated, setUser } =
    UseCurrentApp();
  const handleLogout = async () => {
    const resLog = await authService.logoutAPI();
    if (resLog.status) {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("access_token");
    }
  };
  const avatar = user?.avatar || "https://github.com/shadcn.png";
  return (
    <>
      <div className="w-full p-5 flex justify-between sm:justify-around items-center sticky z-50 top-0 bg-background">
        <div className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <Button className="sm:hidden">
                <MenuOutlined className="text-2xl" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Bing Edu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/about">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/courses">Courses</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/ranking">Ranking</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <NavigationMenu className="max-sm:hidden" viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Home</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        to="/"
                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      >
                        <img className="w-full" src={logo} alt="" />
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem to="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem to="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem to="/docs/primitives/typography" title="Typography">
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to="/about">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to="/courses">Courses</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to="/ranking">Ranking</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Tips</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/reading/tips">
                        <div className="font-medium">Reading tips</div>
                        <div className="text-muted-foreground">
                          Read Faster, Comprehend Deeper
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/speaking/tips">
                        <div className="font-medium">Speaking tips</div>
                        <div className="text-muted-foreground">
                          Speak Clearly, Connect Confidently
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/writing/tips">
                        <div className="font-medium">Writing tips</div>
                        <div className="text-muted-foreground">
                          Write Clearly, Write Better
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {isAuthenticated ? (
          <div className="flex gap-3">
            <NavigationMenu viewport={true}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Avatar>
                      <AvatarImage src={avatar} />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid max-sm:w-[140px] w-[200px] gap-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/overall"
                            className="flex-row items-center gap-2"
                          >
                            <RiAccountCircle2Fill />
                            <span className="max-sm:hidden">
                              Account Overall
                            </span>
                            <span className="sm:hidden">Account</span>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to="#" className="flex-row items-center gap-2">
                            <RiVipDiamondLine />
                            Upgrade to VIP
                          </Link>
                        </NavigationMenuLink>
                        {user?.role === "admin" && (
                          <NavigationMenuLink asChild>
                            <Link
                              to="/admin/dashboard"
                              className="flex-row items-center gap-2"
                            >
                              <MdDashboard />
                              <span className="max-sm:hidden">
                                Admin Dashboard
                              </span>
                              <span className="sm:hidden">Dashboard</span>
                            </Link>
                          </NavigationMenuLink>
                        )}
                        <NavigationMenuLink asChild>
                          <Link to="#" className="flex-row">
                            <button
                              onClick={handleLogout}
                              className="flex items-center gap-2 w-full"
                            >
                              <RiLogoutCircleRLine />
                              <span>Log Out</span>
                            </button>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button
              variant="outline"
              className="max-sm:hidden bg-transparent text-foreground border-none"
            >
              <Bell className="text-xl text-foreground " />
            </Button>
            {theme === "light" && (
              <Button
                className="cursor-pointer"
                onClick={() => setTheme("dark")}
              >
                <Moon></Moon>
              </Button>
            )}
            {theme === "dark" && (
              <Button
                className="cursor-pointer"
                onClick={() => setTheme("light")}
              >
                <Sun></Sun>
              </Button>
            )}
          </div>
        ) : (
          <div className="flex gap-3">
            <Button
              className="cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>
            {theme === "light" && (
              <Button
                className="cursor-pointer"
                onClick={() => setTheme("dark")}
              >
                <Moon></Moon>
              </Button>
            )}
            {theme === "dark" && (
              <Button
                className="cursor-pointer"
                onClick={() => setTheme("light")}
              >
                <Sun></Sun>
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};
function ListItem({
  title,
  children,
  to,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { to: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={to}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default AppHeader;
