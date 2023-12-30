import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import useRenewListing from "@/hooks/useRenewListing";

function RenewListingDialog({
  listingDuration,
  listingID,
}: {
  listingDuration: number;
  listingID: string;
}) {
  const { mutate } = useRenewListing();

  function renewListing(listingDuration: number) {
    mutate({
      listingID,
      listingDuration,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full font-semibold text-gray-600">
          Renew listing
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-4">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Renew listing
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-base">
            Renewing your listing is a breeze! Just click "Renew," and we'll
            take care of the rest. Here's what you can expect:
          </p>
          <span className="flex justify-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="green"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
            <p className="font-semibold text-sm text-gray-600">
              Details Stay as Perfect as You Left Them: All your listing's
              details, like title, description, photos, and pricing, will remain
              untouched.
            </p>
          </span>
          <span className="flex justify-start gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="green"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
            <p className="font-semibold text-sm text-gray-600">
              Fresh Dates, Same Duration: We'll automatically extend your
              listing's availability for the same length as your previous
              listing, starting from today.
            </p>
          </span>
          <span className="mt-2 p-2 border rounded-md bg-gray-100">
            <p className="font-semibold text-xs">
              Need to Tweak It? No Problem!: If you'd like to make any changes,
              simply click the "Edit Listing" option. But remember, renewing is
              the quickest way to keep your listing up and running!
            </p>
          </span>
        </div>
        <DialogFooter>
          <Button
            onClick={() => renewListing(listingDuration)}
            className="bg-gray-950 rounded-full"
          >
            Renew listing
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RenewListingDialog;
