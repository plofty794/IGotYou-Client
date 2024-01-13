import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { AxiosError, AxiosResponse } from "axios";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "@/firebase config/config";
import { FirebaseError } from "firebase/app";
import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useParams } from "react-router-dom";

type TUserUpdates = {
  emailVerified?: boolean;
};

function useVerifyEmail() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TUserUpdates) => {
      try {
        if (!data.emailVerified) {
          await sendEmailVerification(auth.currentUser!);
        } else {
          axiosPrivateRoute.patch("/api/users/current-user/verify-email", {
            ...data,
          });
        }
      } catch (err) {
        const error = err as FirebaseError;
        const message = (
          error.code.split("/")[1].slice(0, 1).toUpperCase() +
          error.code.split("/")[1].slice(1)
        )
          .split("-")
          .join(" ");
        toast({
          title: "Oops! An error occurred.",
          description: message,
          variant: "destructive",
        });
      }
    },
    onSuccess: async (_, { emailVerified }) => {
      if (!emailVerified) {
        toast({
          title: "Verification email has been sent",
          description: "After verifying your email click the reload button.",
          className: "bg-[#FFF] ",
        });
      } else {
        toast({
          title: "Success! 🎉",
          description: "Your email has been verified.",
          className: "bg-[#FFF]",
        });
        queryClient.invalidateQueries({ queryKey: ["profile", id] });
      }
    },
    onError(err) {
      const error = err as AxiosError;
      toast({
        title: "Oops! An error occurred.",
        description: (error.response as AxiosResponse).data.error,
        variant: "destructive",
      });
    },
  });
}

export default useVerifyEmail;
