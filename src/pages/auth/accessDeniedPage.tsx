import accessdenied from "@/assets/403-status-code.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
const AccessDeniedPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-[#C2DEEF] p-4">
      <h1 className="text-2xl font-semibold text-[#14253F] mb-4">
        You're not allowed to access this service
      </h1>
      <img
        width={800}
        src={accessdenied}
        alt="Access Denied"
        className="mb-6"
      />
      <Button asChild>
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  );
};
export default AccessDeniedPage;
