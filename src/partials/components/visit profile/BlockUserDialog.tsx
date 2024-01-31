import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
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
import useBlockUser from "@/hooks/useBlockUser";
import { useState } from "react";

const REASONS = [
  "Harassment",
  "Spamming or excessive messaging",
  "Attempted fraud or scams",
  "Repeated booking cancellations or no-shows",
  "Abusive language or behavior",
];

function BlockUserDialog({
  username,
  blockedID,
}: {
  username?: string;
  blockedID: string;
}) {
  const { mutate } = useBlockUser();
  const [reason, setReason] = useState("");

  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && setReason("")}>
      <DialogTrigger asChild>
        <Button className="w-max gap-2 rounded-full bg-gray-950">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="m5.965 4.904 9.131 9.131a6.5 6.5 0 0 0-9.131-9.131Zm8.07 10.192L4.904 5.965a6.5 6.5 0 0 0 9.131 9.131ZM4.343 4.343a8 8 0 1 1 11.314 11.314A8 8 0 0 1 4.343 4.343Z"
              clipRule="evenodd"
            />
          </svg>
          Block {username}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md gap-4">
        <DialogHeader>
          <DialogTitle className="mb-2 text-xl font-bold">
            Why are you blocking {username}?
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-72 pr-4">
          <RadioGroup onValueChange={(v) => setReason(v)}>
            {REASONS.map((reason, index) => (
              <>
                <div
                  key={index}
                  className="flex h-max w-full items-center justify-between py-2"
                >
                  <Label
                    htmlFor={reason}
                    className="text-sm font-semibold capitalize"
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
                disabled={!reason}
                className="w-max gap-2 rounded-full bg-gray-950"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="m5.965 4.904 9.131 9.131a6.5 6.5 0 0 0-9.131-9.131Zm8.07 10.192L4.904 5.965a6.5 6.5 0 0 0 9.131 9.131ZM4.343 4.343a8 8 0 1 1 11.314 11.314A8 8 0 0 1 4.343 4.343Z"
                    clipRule="evenodd"
                  />
                </svg>
                Block {username}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="font-bold">
                  Are you sure you want to block {username}?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription className="font-semibold">
                This will prevent them from messaging you and close the door on
                any potential bookings they might make.
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-full">
                  Close
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => mutate({ blockedID, reason })}
                  className="rounded-full bg-red-600 hover:bg-red-500"
                >
                  Block
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BlockUserDialog;
