import { ScrollArea } from "@/components/ui/scroll-area";
import ServiceUploader from "@/pages/become a host/ServiceUploader";
import { useEffect, useState } from "react";

function ServiceAssets() {
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
        <section className="my-14 h-max flex flex-col items-center justify-center gap-4">
          <div className="text-center w-[1024px]">
            <h1 className="text-4xl font-semibold">Upload your works</h1>
            <p className="text-gray-600 font-semibold text-lg">
              You'll need 5 images/videos/audio to start. You can add more and
              make changes later.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 w-[600px]">
            <ServiceUploader />
          </div>
        </section>
      </ScrollArea>
    </>
  );
}

export default ServiceAssets;
