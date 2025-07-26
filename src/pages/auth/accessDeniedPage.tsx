import accessdenied from "@/assets/403.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
const AccessDeniedPage = () => {
  return (
    <>
      <div className="flex flex-col h-screen items-center justify-center bg-[#fff]">
        <img width={600} src={accessdenied} alt="" />
        <Button>
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </>
  );
};
export default AccessDeniedPage;
