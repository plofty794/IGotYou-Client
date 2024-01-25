import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const REASONS = [
  "unverified identity",
  "maintenance/upkeep",
  "mismatched expectations",
  "safety concerns",
  "no reviews",
  "negative reviews",
];

function DeclineReasons({
  isExpired,
  isCancelled,
}: {
  isExpired: boolean;
  isCancelled?: boolean;
}) {
  const [declineReason, setDeclineReason] = useState("");

  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && setDeclineReason("")}>
      <DialogTrigger disabled={isExpired || isCancelled} asChild>
        <Button className="rounded-full" variant={"destructive"}>
          Decline
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-4">
        <DialogHeader>
          <DialogTitle className="mb-2 text-2xl font-bold">
            Why are you declining this request?
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-72 pr-4">
          <RadioGroup onValueChange={(v) => setDeclineReason(v)}>
            {REASONS.map((reason, index) => (
              <>
                <div
                  key={index}
                  className="flex h-max w-full items-center justify-between py-2"
                >
                  <Label
                    htmlFor={reason}
                    className="text-base font-medium capitalize"
                  >
                    {reason}
                  </Label>
                  <RadioGroupItem
                    className="h-6 w-6"
                    value={reason}
                    id={reason}
                  />
                </div>
                <Separator />
              </>
            ))}
          </RadioGroup>
        </ScrollArea>
        <DialogFooter>
          <Button
            disabled={!declineReason}
            className="rounded-full bg-gray-950 p-6 text-lg"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeclineReasons;
