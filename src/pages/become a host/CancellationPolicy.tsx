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
import { Badge } from "@/components/ui/badge";
import { differenceInDays } from "date-fns";

type TSetServiceProps = {
  setService: Dispatch<React.SetStateAction<TListing>>;
  service: TListing;
};

function CancellationPolicy() {
  const { setService, service } = useOutletContext<TSetServiceProps>();
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
        className={`h-[450px] w-full rounded-md border transition-opacity ${
          isFadingIn ? "opacity-0" : "opacity-100"
        }`}
      >
        <section className="my-28 flex flex-col items-center justify-center gap-4">
          <div className="w-2/4 text-center">
            <h1 className="text-4xl font-semibold">
              Pick a cancellation policy
            </h1>
            <span className="font-semibold text-gray-600">
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
                  className={`p-10 text-lg font-semibold hover:outline hover:outline-gray-950 ${
                    cancellationPolicy === "Flexible" ? "outline" : ""
                  }`}
                >
                  Flexible
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="mx-auto flex w-full flex-col">
                <span className="font-bold uppercase text-green-600">
                  Flexible
                </span>

                <p className="mt-2 text-base font-semibold text-gray-600">
                  Full refund 1 day prior to service.
                </p>
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  disabled={
                    differenceInDays(
                      service.date.from!,
                      new Date().setHours(0, 0, 0, 0),
                    ) < 3
                  }
                  type="button"
                  onClick={() => {
                    setCancellationPolicy("Moderate");
                    setService((prev) => ({
                      ...prev,
                      cancellationPolicy: "Moderate",
                    }));
                  }}
                  variant={"outline"}
                  className={`p-10 text-lg font-semibold hover:outline hover:outline-gray-950 ${
                    cancellationPolicy === "Moderate" ? "outline" : ""
                  }`}
                >
                  Moderate
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="mx-auto flex w-full flex-col">
                <span className="font-bold uppercase text-amber-600">
                  Moderate
                </span>
                <p className="mt-2 text-base font-semibold text-gray-600">
                  Full refund at least 3 days prior to service.
                </p>
                {differenceInDays(
                  service.date.from!,
                  new Date().setHours(0, 0, 0, 0),
                ) < 3 && (
                  <Badge variant={"destructive"} className="mt-2 w-max">
                    Can be applied to listings at least 3 days before it starts.
                  </Badge>
                )}
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  disabled={
                    differenceInDays(
                      service.date.from!,
                      new Date().setHours(0, 0, 0, 0),
                    ) < 5
                  }
                  onClick={() => {
                    setCancellationPolicy("Strict");
                    setService((prev) => ({
                      ...prev,
                      cancellationPolicy: "Strict",
                    }));
                  }}
                  type="button"
                  variant={"outline"}
                  className={`p-10 text-lg font-semibold hover:outline hover:outline-gray-950 ${
                    cancellationPolicy === "Strict" ? "outline" : ""
                  }`}
                >
                  Strict
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="mx-auto flex w-2/5 flex-col p-0">
                <ScrollArea className="h-max p-4">
                  <span className="font-bold uppercase text-red-800">
                    Strict
                  </span>
                  <p className="mt-2 text-sm font-semibold text-gray-600">
                    Full refund for cancellations made if the service date is at
                    least 5 days away. 50% refund for cancellations made at
                    least 3-5 days before service. No refunds for cancellations
                    made within 3 days before service.
                  </p>
                  {differenceInDays(
                    service.date.from!,
                    new Date().setHours(0, 0, 0, 0),
                  ) < 5 && (
                    <Badge variant={"destructive"} className="mt-2 w-max">
                      Can be applied to listings at least 5 days before it
                      starts.
                    </Badge>
                  )}
                </ScrollArea>
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  onClick={() => {
                    setCancellationPolicy("Non-refundable");
                    setService((prev) => ({
                      ...prev,
                      cancellationPolicy: "Non-refundable",
                    }));
                  }}
                  type="button"
                  variant={"outline"}
                  className={`p-10 text-lg font-semibold hover:outline hover:outline-gray-950 ${
                    cancellationPolicy === "Non-refundable" ? "outline" : ""
                  }`}
                >
                  Non-refundable
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="mx-auto flex w-3/4 flex-col p-0">
                <ScrollArea className="h-max p-4">
                  <span className="font-bold uppercase text-red-600">
                    Non-refundable
                  </span>
                  <p className="mt-2 text-sm font-semibold text-gray-600">
                    Guests pay 10% less, but you keep your payout no matter when
                    they cancel.
                  </p>
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
