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
  serviceDescription,
  listingID,
}: {
  serviceDescription: string;
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
          <AlertDialogTitle className="flex items-center gap-2 font-semibold text-xl">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
            Disable listing
          </AlertDialogTitle>
          <div className="flex items-center justify-center gap-2 p-4 border border-red-300 rounded-md bg-red-200">
            <AlertDialogDescription className="font-bold text-sm text-gray-600">
              If you disable this listing, it will temporarily disappear from
              search results and won't be bookable.
            </AlertDialogDescription>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-sm text-gray-600">Listing name</p>
            <p className="font-bold text-lg">{serviceDescription}</p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => disableListing(listingID)}
            className="bg-red-600 hover:bg-red-500 rounded-full"
          >
            Disable
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DisableListingDialog;
