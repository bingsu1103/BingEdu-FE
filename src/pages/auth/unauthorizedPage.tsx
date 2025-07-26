import unauthorized from "@/assets/401.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
const UnauthorizedPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#E6EBFF]">
        <h1 className="text-4xl font-extrabold max-md:text-3xl text-[#000]">
          401 Unauthorized
        </h1>
        <img width={500} src={unauthorized} alt="" />
        <div className="flex gap-3 items-center">
          <Button variant="secondary" className="mt-5 cursor-pointer">
            <Link to="/login">Login</Link>
          </Button>
          <Button className="mt-5 cursor-pointer">
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </>
  );
};
export default UnauthorizedPage;
