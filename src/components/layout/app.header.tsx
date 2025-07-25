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
import { GoBell } from "react-icons/go";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RiVipDiamondLine } from "react-icons/ri";
import { RiAccountCircle2Fill } from "react-icons/ri";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { UseCurrentApp } from "../context/app.context";
import { Button } from "../ui/button";
import authService from "@/services/auth.service";
import { MdDashboard } from "react-icons/md";
import logo from "@/assets/bingedulogo.jpg";

const components: { title: string; to: string; description: string }[] = [
  {
    title: "Reading exam",
    to: "/exams/reading",
    description:
      "Practice reading comprehension with timed exercises and instant feedback.",
  },
  {
    title: "Grammar practice",
    to: "/practice/grammar",
    description:
      "Improve your understanding of sentence structure, tenses, and grammar rules through interactive quizzes.",
  },
  {
    title: "Writing exam",
    to: "/exams/writing",
    description:
      "Complete essay-based writing tasks with progress tracking and auto-save features.",
  },
  {
    title: "Listening exam",
    to: "/exams/listening",
    description:
      "Listen to audio clips and answer questions to test comprehension and attention.",
  },
  {
    title: "General exam",
    to: "/exams/general",
    description:
      "Mixed-format test covering reading, writing, grammar, and listening skills.",
  },
  {
    title: "Vocabulary practice",
    to: "/practice/vocabulary",
    description:
      "Interactive quizzes to reinforce vocabulary retention and usage in context.",
  },
];

const AppHeader = () => {
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
  return (
    <>
      <div className="p-5 flex justify-around items-center">
        <NavigationMenu viewport={false}>
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
              <NavigationMenuTrigger>Exam library</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      to={component.to}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to="/docs">Docs</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Tips</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="#">
                        <div className="font-medium">Reading tips</div>
                        <div className="text-muted-foreground">
                          Read Faster, Comprehend Deeper
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="#">
                        <div className="font-medium">Speaking tips</div>
                        <div className="text-muted-foreground">
                          Speak Clearly, Connect Confidently
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="#">
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

            <NavigationMenuItem>
              <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="#">Components</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="#">Documentation</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="#">Blocks</Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <GoBell className="text-xl" />
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="#" className="flex-row items-center gap-2">
                            <RiAccountCircle2Fill />
                            Account Setting
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
                              to="#"
                              className="flex-row items-center gap-2"
                            >
                              <MdDashboard />
                              Admin Dashboard
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
