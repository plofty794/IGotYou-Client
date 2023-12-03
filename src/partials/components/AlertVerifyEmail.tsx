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
import { Separator } from "@/components/ui/separator";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function AlertVerifyEmail({ User }: { User: User }) {
  const navigate = useNavigate();
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-sm font-semibold hover:bg-zinc-100 p-4 rounded-full">
        Want to host?
      </AlertDialogTrigger>
      <AlertDialogContent className="p-0 gap-0">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 p-6">
            <CircleBackslashIcon color="red" width={25} height={25} />
            <AlertDialogTitle className="font-semibold text-base">
              Oops! Your email isn't verified yet.
            </AlertDialogTitle>
          </div>
        </AlertDialogHeader>
        <Separator />
        <div className="px-6 py-4">
          <div className="flex flex-col justify-center gap-2">
            <span className="text-sm ">
              We hope this message finds you well. In order to enhance the{" "}
              <span className="font-bold text-red-500 underline underline-offset-2">
                security
              </span>{" "}
              and{" "}
              <span className="font-bold text-red-500 underline underline-offset-2">
                trustworthiness
              </span>{" "}
              of our platform, we kindly request your assistance in verifying
              your email address. This verification is necessary before you can
              proceed to create a listing on our website.
            </span>
            <span className="text-sm  ">
              Thank you for your cooperation in ensuring the security and
              integrity of our platform. We look forward to having your verified
              email and seeing your listing soon!
            </span>
          </div>
        </div>
        <Separator />
        <AlertDialogFooter className="p-4">
          <AlertDialogCancel className="font-medium text-sm rounded-full">
            Close
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => navigate(`/users/show/${User && User.uid}`)}
            className="font-medium text-sm bg-gray-950 text-white rounded-full"
          >
            Go to your profile
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertVerifyEmail;
