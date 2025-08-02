import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AppProvider } from "@/components/context/app.context.tsx";
import HomePage from "@/pages/homePage.tsx";
import AboutPage from "@/pages/aboutPage.tsx";
import { ThemeProvider } from "@/components/context/theme.context.tsx";
import LoginPage from "./pages/auth/loginPage.tsx";
import SignupPage from "./pages/auth/signupPage.tsx";
import "@ant-design/v5-patch-for-react-19";
import ForgotPasswordPage from "./pages/auth/forgotPasswordPage.tsx";
import ResetPasswordPage from "./pages/auth/resetPassword.tsx";
import NotFoundPage from "./pages/auth/notfoundPage.tsx";
import AdminDashBoardPage from "./pages/admin/dashBoardPage.tsx";
import ProtectedRoute from "./components/auth/auth.tsx";
import OverallUser from "./pages/overallUser.tsx";
import TestDetailPage from "./pages/testDetailPage.tsx";
import CoursesPage from "./pages/coursesPage.tsx";
import LessonPage from "./pages/lessonPage.tsx";
import ReadingTips from "./components/docs/readingTips.tsx";
import SpeakingTips from "./components/docs/speakingTips.tsx";
import WritingTips from "./components/docs/writingTips.tsx";
import BlogPost from "./components/docs/blogPost.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/courses",
        element: <CoursesPage />,
      },
      {
        path: "/courses/:id/lesson",
        element: <LessonPage />,
      },
      {
        path: "/courses/:id/lesson/:lessonId",
        element: <TestDetailPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/reading/tips",
        element: <ReadingTips />,
      },
      {
        path: "/reading/tips/:id",
        element: <BlogPost type="reading" />,
      },
      {
        path: "/speaking/tips",
        element: <SpeakingTips />,
      },
      {
        path: "/speaking/tips/:id",
        element: <BlogPost type="speaking" />,
      },
      {
        path: "/writing/tips",
        element: <WritingTips />,
      },
      {
        path: "/writing/tips/:id",
        element: <BlogPost type="writing" />,
      },
      {
        path: "/overall",
        element: (
          <ProtectedRoute>
            <OverallUser />,
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/dashboard",
        element: (
          <ProtectedRoute>
            <AdminDashBoardPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ThemeProvider>
  </StrictMode>
);
