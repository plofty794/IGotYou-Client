import Lottie from "lottie-react";
import pageUnavailable from "../assets/cannot-find.json";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function PageUnavailable() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 max-md:p-2">
      <Lottie
        animationData={pageUnavailable}
        className="max-h-36 max-w-[144px]"
      />
      <h1 className="text-center text-4xl font-bold max-md:text-2xl">
        This page isn't available right now
      </h1>
      <p className="max-w-lg text-center text-lg font-semibold text-gray-600 max-md:max-w-xs max-md:text-sm">
        When this happens, it's usually because the owner only shared it with a
        small group of people or changed who can see it.
      </p>
      <Link to={"/"} replace className="mt-2">
        <Button className="rounded-full bg-gray-950 p-6 text-base max-md:p-4 max-md:text-sm">
          Go to homepage
        </Button>
      </Link>
    </div>
  );
}

export default PageUnavailable;
