import { ScrollArea } from "@radix-ui/react-scroll-area";
import Lottie from "lottie-react";
import standout from "../../../assets/stand-out.json";
import { useEffect, useState } from "react";

function MakeItStandOut() {
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    document.title = "IGotYou - Make it Stand out";
    setTimeout(() => setIsFadingIn(false), 400);
  }, []);

  return (
    <>
      <ScrollArea
        className={`w-full h-[450px] rounded-md border transition-opacity ${
          isFadingIn ? "opacity-0" : "opacity-100"
        }`}
      >
        <section className="my-8 h-[400px] flex items-center gap-4">
          <div className="flex flex-col items-end gap-4 w-[1300px] pl-16 font-semibold">
            <p>Step 2</p>
            <h1 className="text-4xl">Make it stand out</h1>
            <p className="text-right font-medium text-zinc-500">
              In this step, we'll ask you to show/upload your works. This will
              help customers to choose you. Show your best work!
            </p>
          </div>
          <div className="w-full">
            <span className="font-medium">
              <Lottie
                className="w-[350px] h-[350px]"
                animationData={standout}
                loop={false}
              />
            </span>
          </div>
        </section>
      </ScrollArea>
    </>
  );
}

export default MakeItStandOut;
