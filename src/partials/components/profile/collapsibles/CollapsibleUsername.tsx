import { Button } from "@/components/ui/button";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UsernameSchema, ZodUsernameSchema } from "@/zod/usernameSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Collapsible } from "@radix-ui/react-collapsible";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";
import { QueryState } from "@tanstack/react-query";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";
import { updateProfile } from "firebase/auth";
import { auth } from "@/firebase config/config";
import { dotPulse } from "ldrs";
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

type TUser = {
  data: QueryState<TUserData, unknown> | undefined;
};

function CollapsibleUsername({ data }: TUser) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useUpdateUserProfile();
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UsernameSchema>({
    defaultValues: {
      username: data?.data?.user.username ?? "",
    },
    resolver: zodResolver(ZodUsernameSchema),
  });

  async function handleFormSubmit(info: UsernameSchema) {
    const { username } = info;
    if (username === data?.data?.user.username) {
      return setMessage("This is already your current username");
    }
    await updateProfile(auth.currentUser!, {
      displayName: username,
    });
    mutate({ username });
    setMessage("");
  }

  return (
    <Collapsible open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <div className="flex items-start justify-between">
        <div className="text-sm">
          <Label className="font-semibold" htmlFor="username">
            Username
          </Label>
          <p id="username" className={`mt-2 ${isOpen ? "hidden" : ""}`}>
            {data?.data?.user.username}
          </p>
        </div>
        <CollapsibleTrigger>
          <span className="text-sm font-medium underline">
            {isOpen ? "Cancel" : "Edit"}
          </span>
        </CollapsibleTrigger>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CollapsibleContent>
          <span className="text-sm">
            This is the name on your IGotYou account.
          </span>
          <div className="mt-4 flex gap-2">
            <div className="flex w-full flex-col gap-1">
              <Input {...register("username")} autoFocus />
              {errors.username && (
                <ErrorMessage message={errors.username.message} />
              )}
              {message && <ErrorMessage message={message} />}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                setMessage("");
                setValue("username", "");
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
        </CollapsibleContent>
      </form>
    </Collapsible>
  );
}

export default CollapsibleUsername;
