import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import useCancelBookingRequest from "@/hooks/useCancelBookingRequest";
import { useState } from "react";

const REASONS = [
  "unverified identity",
  "unexpected events",
  "mismatched expectations",
  "safety concerns",
  "no reviews",
  "negative reviews",
  "change of heart",
];

function CancelRequestDialog({
  bookingRequestID,
}: {
  bookingRequestID: string;
}) {
  const [declineReason, setDeclineReason] = useState("");
  const { mutate, isPending } = useCancelBookingRequest();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-0 text-red-600" variant={"link"}>
          Cancel request
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-4">
        <DialogHeader>
          <DialogTitle className="mb-2 text-2xl font-bold">
            Why are you cancelling?
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={!declineReason}
                className="rounded-full bg-gray-950 p-6 text-lg"
              >
                Submit
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to cancel?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <p className="text-sm font-semibold text-gray-600">
                Once you cancel, your booking request will be removed from
                host's inbox. Are you absolutely sure you want to proceed?
              </p>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-full">
                  Close
                </AlertDialogCancel>
                <AlertDialogAction
                  disabled={isPending}
                  onClick={() =>
                    mutate({
                      bookingRequestID,
                      guestCancelReasons: declineReason,
                    })
                  }
                  className="rounded-full bg-gray-950"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CancelRequestDialog;
