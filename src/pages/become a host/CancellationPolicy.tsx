import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dispatch, useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { TListing } from "@/root layouts/BecomeAHostLayout";
import { useOutletContext } from "react-router-dom";

type TSetServiceProps = {
  setService: Dispatch<React.SetStateAction<TListing>>;
  service: TListing;
};

function CancellationPolicy() {
  const { setService } = useOutletContext<TSetServiceProps>();
  const [isFadingIn, setIsFadingIn] = useState(true);
  const [cancellationPolicy, setCancellationPolicy] = useState("");

  useEffect(() => {
    document.title = "Cancellation Policy - IGotYou";
    const timeout = setTimeout(() => setIsFadingIn(false), 400);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <ScrollArea
        className={`w-full h-[450px] rounded-md border transition-opacity ${
          isFadingIn ? "opacity-0" : "opacity-100"
        }`}
      >
        <section className="my-28 flex flex-col items-center justify-center gap-4">
          <div className="text-center w-2/4">
            <h1 className="text-4xl font-semibold">
              Pick a cancellation policy
            </h1>
            <span className="text-gray-600 font-semibold">
              Choose a policy that caters your service.
            </span>
          </div>
          <div className="mt-4 flex items-center justify-center gap-6">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  type="button"
                  onClick={() => {
                    setCancellationPolicy("Flexible");
                    setService((prev) => ({
                      ...prev,
                      cancellationPolicy: "Flexible",
                    }));
                  }}
                  variant={"outline"}
                  className={`p-10 text-lg font-semibold hover:outline-gray-950 hover:outline ${
                    cancellationPolicy === "Flexible" ? "outline" : ""
                  }`}
                >
                  Flexible
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="flex flex-col p-0 w-2/5 mx-auto">
                <ScrollArea className="h-44 p-4">
                  <span className="font-bold text-green-600 uppercase">
                    Flexible
                  </span>
                  <ul className="flex flex-col gap-2 list-disc px-4 py-2">
                    <li className="text-sm font-medium text-gray-600">
                      Users can cancel their booking and receive a full refund
                      up to a certain period before the scheduled service start
                      time.
                    </li>
                    <li className="text-sm font-medium text-gray-600">
                      If a user cancels within a time frame before the service
                      starts, they might receive a full refund and is usually
                      more generous compared to other policies.
                    </li>
                  </ul>
                </ScrollArea>
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  type="button"
                  onClick={() => {
                    setCancellationPolicy("Moderate");
                    setService((prev) => ({
                      ...prev,
                      cancellationPolicy: "Moderate",
                    }));
                  }}
                  variant={"outline"}
                  className={`p-10 text-lg font-semibold hover:outline-gray-950 hover:outline ${
                    cancellationPolicy === "Moderate" ? "outline" : ""
                  }`}
                >
                  Moderate
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="flex flex-col p-0 w-2/4 mx-auto">
                <ScrollArea className="h-44 p-4">
                  <span className="font-bold text-amber-600 uppercase">
                    Moderate
                  </span>
                  <ul className="flex flex-col gap-2 list-disc px-4 py-2">
                    <li className="text-sm font-medium text-gray-600">
                      This policy offers a moderate level of flexibility for
                      cancellations.
                    </li>
                    <li className="text-sm font-medium text-gray-600">
                      If a user cancels within a time frame before the service
                      starts, they might receive a partial refund or no refund
                      at all.
                    </li>
                  </ul>
                </ScrollArea>
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  onClick={() => {
                    setCancellationPolicy("Strict");
                    setService((prev) => ({
                      ...prev,
                      cancellationPolicy: "Strict",
                    }));
                  }}
                  type="button"
                  variant={"outline"}
                  className={`p-10 text-lg font-semibold hover:outline-gray-950 hover:outline ${
                    cancellationPolicy === "Strict" ? "outline" : ""
                  }`}
                >
                  Strict
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="flex flex-col p-0 w-2/4 mx-auto">
                <ScrollArea className="h-max p-4">
                  <span className="font-bold text-red-600 uppercase">
                    Strict
                  </span>
                  <ul className="flex flex-col gap-2 list-disc px-4 py-2">
                    <li className="text-sm font-medium text-gray-600">
                      This is the least flexible cancellation policy.
                    </li>
                    <li className="text-sm font-medium text-gray-600">
                      If a user cancels within a time frame before the service
                      starts, they are unlikely to receive a refund or might
                      receive only a partial refund.
                    </li>
                  </ul>
                </ScrollArea>
              </HoverCardContent>
            </HoverCard>
          </div>
        </section>
      </ScrollArea>
    </>
  );
}

export default CancellationPolicy;
