import unauthorized from "@/assets/401.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
const UnauthorizedPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-[#E5F6FF]">
      <h1 className="text-xl sm:text-2xl font-semibold text-[#14253F] mb-4 ">
        Please login to use this service
      </h1>
      <img
        width={600}
        style={{ clipPath: "inset(1px)" }}
        src={unauthorized}
        alt=""
      />
      <div className="flex gap-3 items-center">
        <Button variant="secondary" className="mt-5 cursor-pointer">
          <Link to="/login">Login</Link>
        </Button>
        <Button className="mt-5 cursor-pointer">
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
};
export default UnauthorizedPage;
