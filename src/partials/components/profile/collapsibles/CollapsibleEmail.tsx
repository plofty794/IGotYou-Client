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
import { useForm } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";
import { dotPulse } from "ldrs";
import { sendEmailVerification, updateEmail } from "firebase/auth";
import { auth } from "@/firebase config/config";
import { useToast } from "@/components/ui/use-toast";
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
    await updateEmail(auth.currentUser!, email);
    await sendEmailVerification(auth.currentUser!);
    mutate({ email, emailVerified: false });
    toast({
      title: "Success! 🎉",
      description: "Profile has been updated.",
      className: "bg-white",
    });
    setTimeout(
      () =>
        toast({
          title: "Email verification has been sent",
          description: "Check your inbox to verify your email.",
          className: "bg-white",
        }),
      1000,
    );
  }

  // unlink(auth.currentUser!, GoogleAuth.providerId);

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
        <form onSubmit={handleSubmit(changeEmail)}>
          <span className="text-sm">
            Use an email address you’ll always have access to.
          </span>
          <div className="mt-4 flex flex-col gap-2">
            <div className="w-full">
              <Input placeholder="Email address" {...register("email")} />
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
            <Button className="mt-3 w-max rounded-full bg-[#222222] text-xs font-semibold">
              {isPending ? (
                <l-dot-pulse size="35" speed="1.3" color="white"></l-dot-pulse>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default CollapsibleEmail;
