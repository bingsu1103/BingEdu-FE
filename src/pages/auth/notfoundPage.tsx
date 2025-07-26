import notfound from "@/assets/404new.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
const NotFoundPage = () => {
  return (
    <>
      <div className="flex items-center flex-col h-screen justify-center bg-[#FFF]">
        <h1 className="lg:text-3xl text-2xl text-[#000] font-bold">
          Page Not Found
        </h1>
        <img width={600} src={notfound} alt="404" />
        <Button className="cursor-pointer">
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </>
  );
};
export default NotFoundPage;
