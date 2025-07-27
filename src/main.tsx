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
import ProfilePage from "./pages/profilePage.tsx";

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
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
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
