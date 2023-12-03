import { ScrollArea } from "@/components/ui/scroll-area";
import aboutservice from "../../../assets/about-service.json";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

function AboutYourService() {
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    document.title = "IGotYou - About your Service";
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
          <div className="flex flex-col items-end gap-4 w-[1280px] pl-16 font-semibold">
            <p>Step 1</p>
            <h1 className="text-4xl">Tell us about your service</h1>
            <p className="text-right font-medium text-zinc-500">
              In this step, we'll ask you which type of service you have. Then
              let us know the name of your service.
            </p>
          </div>
          <div className="w-full">
            <span className="font-medium">
              <Lottie
                className="w-[400px] h-[400px]"
                animationData={aboutservice}
                loop={false}
              />
            </span>
          </div>
        </section>
      </ScrollArea>
    </>
  );
}

export default AboutYourService;
