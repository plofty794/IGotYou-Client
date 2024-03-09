import { Button } from "@/components/ui/button";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmailSchema, ZodEmailSchema } from "@/zod/emailSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Collapsible } from "@radix-ui/react-collapsible";
import { QueryState } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, UseFormHandleSubmit, useForm } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";
import { dotPulse } from "ldrs";
import { verifyBeforeUpdateEmail } from "firebase/auth";
import { auth } from "@/firebase config/config";
import { useToast } from "@/components/ui/use-toast";
import { toast as sonnerToast } from "sonner";
import { FirebaseError } from "firebase/app";
import { CrossCircledIcon, ReloadIcon } from "@radix-ui/react-icons";
import useLogOutUser from "@/hooks/useLogout";
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
dotPulse.register();

type TUserData = {
  user: {
    email?: string;
    username?: string;
    userStatus?: string;
    work?: string;
    address?: string;
    funFact?: string;
    school?: string;
    emailVerified: boolean;
    mobilePhone: string;
    mobileVerified: boolean;
  };
};

type TCollapsibleData = {
  data: QueryState<TUserData, unknown> | undefined;
};

function CollapsibleEmail({ data }: TCollapsibleData) {
  const logOut = useLogOutUser();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useUpdateUserProfile();
  const [message, setMessage] = useState("");
  const hiddenEmail =
    data?.data?.user.email &&
    data?.data?.user.email.replace(/^(\w)+/, `${data.data.user.email[0]}***`);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EmailSchema>({
    defaultValues: {
      email: data?.data?.user.email,
    },
    resolver: zodResolver(ZodEmailSchema),
  });

  async function changeEmail(emailInfo: EmailSchema) {
    const { email } = emailInfo;
    if (email === data?.data?.user.email) {
      return setMessage("This is already your current email address");
    }
    try {
      await verifyBeforeUpdateEmail(auth.currentUser!, email);
      mutate({ email });
      sonnerToast(
        <div className="flex w-max gap-2">
          <ReloadIcon
            color="white"
            className="inline-block h-6 w-6 animate-spin rounded-full bg-green-500 p-1"
          />
          <p className="text-sm font-semibold">Logging out...</p>
        </div>,
        {
          duration: 2000,
        },
      );
      setTimeout(async () => {
        await logOut();
        window.location.reload();
      }, 3000);
    } catch (err) {
      const error = err as FirebaseError;
      const message = (
        error.code.split("/")[1].slice(0, 1).toUpperCase() +
        error.code.split("/")[1].slice(1)
      )
        .split("-")
        .join(" ");

      if (message === "Requires recent login") {
        sonnerToast("Uh oh!", {
          description: message + ". Re-login your account.",
          duration: 5000,
          icon: (
            <CrossCircledIcon
              color="white"
              className="h-4 w-4 rounded-full bg-[#dc2626]"
            />
          ),
          action: {
            label: "Log out",
            onClick: async () => await logOut(),
          },
          actionButtonStyle: {
            backgroundColor: "white",
            color: "black",
            border: "1px solid black",
            borderRadius: "6px",
            cursor: "pointer",
          },
        });
      } else {
        toast({
          title: "Oops! An error occurred.",
          description: message,
          variant: "destructive",
        });
      }
    }
  }

  return (
    <Collapsible open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <div className="flex items-start justify-between">
        <div className="text-sm">
          <Label htmlFor="email">Email</Label>
          <p id="email" className={`mt-2 text-sm ${isOpen ? "hidden" : ""}`}>
            {hiddenEmail}
          </p>
        </div>
        <CollapsibleTrigger>
          <span className="text-sm font-medium underline">
            {isOpen ? "Cancel" : "Edit"}
          </span>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <span className="text-sm">
          Use an email address you’ll always have access to.
        </span>
        <div className="mt-4 flex flex-col gap-2">
          <div className="w-full">
            <Input
              autoComplete="off"
              placeholder="Email address"
              {...register("email")}
            />
          </div>
          {errors.email && <ErrorMessage message={errors.email.message} />}
          {message && <ErrorMessage message={message} />}
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setMessage("");
              setValue("email", "");
            }}
            className="mt-3 w-max rounded-full bg-[#222222] text-xs font-semibold"
          >
            Clear
          </Button>
          <ConfirmationRequiredDialog
            changeEmail={changeEmail}
            handleSubmit={handleSubmit}
            isPending={isPending}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function ConfirmationRequiredDialog({
  isPending,
  handleSubmit,
  changeEmail,
}: {
  isPending: boolean;
  changeEmail: SubmitHandler<{ email: string }>;
  handleSubmit: UseFormHandleSubmit<
    {
      email: string;
    },
    undefined
  >;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger type="button" asChild>
        <Button
          type="button"
          className="mt-3 w-max rounded-full bg-[#222222] text-xs font-semibold"
        >
          Save
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to change your email address?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2">
          <AlertDialogDescription className="font-medium text-black">
            Changing your email address will{" "}
            <span className="font-bold text-red-500 underline">
              send a confirmation email
            </span>{" "}
            to the new address provided. Once you{" "}
            <span className="font-bold text-red-500 underline">
              click the link
            </span>{" "}
            in the confirmation email, you will be able to sign in with your new
            email address.
          </AlertDialogDescription>
          <AlertDialogDescription className="font-medium text-black">
            Please{" "}
            <span className="font-bold text-red-500 underline">
              ensure that the new email address is correct and valid.
            </span>{" "}
            If an unverified or non-existing email address is provided, your
            account cannot be retrieved.
          </AlertDialogDescription>
          <AlertDialogDescription className="font-medium text-black">
            Proceeding with an incorrect email address may result in account
            access issues.
          </AlertDialogDescription>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
          <form onSubmit={handleSubmit(changeEmail)}>
            <AlertDialogAction
              type="submit"
              className="rounded-full bg-gray-950"
            >
              {isPending ? (
                <l-dot-pulse size="35" speed="1.3" color="white"></l-dot-pulse>
              ) : (
                "Continue"
              )}
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CollapsibleEmail;
