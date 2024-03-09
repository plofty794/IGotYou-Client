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
import useUnblockUser from "@/hooks/useUnblockUser";

function UnblockUserDialog({
  username,
  blockedID,
}: {
  username: string;
  blockedID: string;
}) {
  const { mutate } = useUnblockUser();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="rounded-full bg-gray-950">Unblock {username}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to unblock {username}?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="font-bold">
          This will allow them to message you and send booking request with your
          listings again. You can always block them again later if needed.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutate({ blockedID })}
            className="rounded-full bg-gray-950"
          >
            Unblock
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default UnblockUserDialog;
