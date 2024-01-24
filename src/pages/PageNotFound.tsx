import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="flex flex-col items-center justify-center gap-5">
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-5xl font-bold text-[#F24E1E]">Oops!</h1>
          <h2 className="text-lg font-semibold text-gray-600">
            {" "}
            We can't seem to find the page you're looking for.
          </h2>
          <h3 className="text-lg font-semibold text-gray-600">
            error code: <span className="font-bold text-[#F24E1E]">404</span>
          </h3>
        </div>
        <Button size={"lg"} className="rounded-full bg-gray-950 text-base">
          <Link to={"/"} replace>
            Go back
          </Link>
        </Button>
      </section>
    </main>
  );
}

export default PageNotFound;
