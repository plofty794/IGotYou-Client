import { useEffect, useState } from "react";
import confetti from "../../../assets/confetti.json";
import Lottie from "lottie-react";
import { ScrollArea } from "@/components/ui/scroll-area";

function Success() {
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    document.title = "IGotYou - Make it Stand out";
    const Timeout = setTimeout(() => setIsFadingIn(false), 400);

    return () => clearTimeout(Timeout);
  }, []);

  return (
    <>
      <ScrollArea
        className={`w-full h-[450px] rounded-md border transition-opacity ${
          isFadingIn ? "opacity-0" : "opacity-100"
        }`}
      >
        <section className="my-24 h-max flex gap-2 items-center justify-center">
          <span className="text-[#222222] text-7xl font-bold">
            {isFadingIn ? "Loading..." : "Congratulations!"}
          </span>

          <Lottie animationData={confetti} className="w-[250px] h-[250px]" />
        </section>
      </ScrollArea>
    </>
  );
}

export default Success;
