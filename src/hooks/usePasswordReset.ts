import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { EmailSchema } from "@/zod/emailSchema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase config/config";

function usePasswordReset() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: EmailSchema) => {
      return await axiosPrivateRoute.post(
        "/api/users/email-check",
        {
          ...data,
        },
        {}
      );
    },
    onSuccess: async (_, variables) => {
      try {
        await sendPasswordResetEmail(auth, variables.email);
        toast({
          title: "Password reset email sent.",
          description:
            "Please check your email for a link to reset your password.",
          className: "bg-white text-[#222222] font-medium",
        });
      } catch (error) {
        console.error(error);
      }
    },
    onError: async (err) => {
      const error = err as AxiosError;
      toast({
        title: "Oops! An error occurred.",
        description: (error.response as AxiosResponse).data.error,
        variant: "destructive",
      });
    },
  });
}

export default usePasswordReset;
