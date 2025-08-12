import { useLocation } from "react-router";
import { useCurrentApp } from "../context/app.context";
import UnauthorizedPage from "@/pages/auth/unauthorizedPage";
import AccessDeniedPage from "@/pages/auth/accessDeniedPage";

interface IProps {
  children: React.ReactNode;
}
const ProtectedRoute = (props: IProps) => {
  const { isAuthenticated, user } = useCurrentApp();
  const location = useLocation();

  if (isAuthenticated === false) {
    return <UnauthorizedPage></UnauthorizedPage>;
  }

  const isAdmin = location.pathname.includes("admin");
  if (isAuthenticated === true && isAdmin === true) {
    const role = user?.role;
    if (role === "user") {
      return <AccessDeniedPage></AccessDeniedPage>;
    }
  }
  return <>{props.children}</>;
};
export default ProtectedRoute;
