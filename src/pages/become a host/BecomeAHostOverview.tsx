import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

function BecomeAHostOverview() {
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    document.title = "IGotYou - Overview";
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
        <section className="my-8 h-[400px] flex items-center gap-28">
          <div className="w-[1024px] pl-16">
            <h1 className="text-5xl font-semibold">
              It’s easy to get started on IGotYou
            </h1>
          </div>
          <div className="flex flex-col gap-10 w-full text-2xl">
            <span className="font-medium">
              1. Tell us about your service{" "}
              <p className="ml-6 text-base font-normal text-zinc-500">
                Share some basic info, like what it is.
              </p>
            </span>
            <Separator />
            <span className="font-medium">
              2. Make it stand out{" "}
              <p className="ml-7 text-base font-normal text-zinc-500">
                Add 5 or more photos plus a title and description—we’ll help you
                out.
              </p>
            </span>
            <Separator />
            <span className="font-medium">
              3. Finish up and publish{" "}
              <p className="ml-7 text-base font-normal text-zinc-500">
                Set a starting price, and publish your listing.
              </p>
            </span>
          </div>
        </section>
      </ScrollArea>
    </>
  );
}

export default BecomeAHostOverview;
