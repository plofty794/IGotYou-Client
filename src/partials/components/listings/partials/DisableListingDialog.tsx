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
import useDisableListing from "@/hooks/useDisableListing";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

function DisableListingDialog({
  serviceTitle,
  listingID,
}: {
  serviceTitle: string;
  listingID: string;
}) {
  const { mutate } = useDisableListing();

  function disableListing(listingID: string) {
    mutate({
      listingID,
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="w-full font-semibold text-gray-600">
          Disable listing
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="gap-2">
          <AlertDialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
            Disable listing
          </AlertDialogTitle>
          <div className="flex items-center justify-center gap-2 rounded-md border border-red-300 bg-red-200 p-4">
            <AlertDialogDescription className="text-sm font-bold text-gray-600">
              If you disable this listing, it will temporarily disappear from
              search results and won't be bookable.
            </AlertDialogDescription>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-gray-600">Listing name</p>
            <p className="text-lg font-bold">{serviceTitle}</p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => disableListing(listingID)}
            className="rounded-full bg-red-600 hover:bg-red-500"
          >
            Disable
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DisableListingDialog;
