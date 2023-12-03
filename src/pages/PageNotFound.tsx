import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <section className="flex flex-col items-center justify-center gap-5">
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-5xl font-bold text-[#F24E1E]">Oops!</h1>
          <h2 className="font-semibold text-lg text-gray-600">
            {" "}
            We can't seem to find the page you're looking for.
          </h2>
          <h3 className="text-gray-600 text-lg font-semibold">
            error code: <span className="text-[#F24E1E] font-bold">404</span>
          </h3>
        </div>
        <Button className="text-sm font-medium bg-gray-950 rounded-full">
          <Link to={"/"} replace>
            Go back
          </Link>
        </Button>
      </section>
    </main>
  );
}

export default PageNotFound;
