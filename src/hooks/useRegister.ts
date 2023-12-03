import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { UserStateContextProvider } from "@/context/UserStateContext";
import { auth } from "@/firebase config/config";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";

type TRegister = {
  email: string;
  password: string;
};

export function useRegister() {
  const { dispatch } = useContext(UserStateContextProvider);
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: TRegister) => {
      return await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
    },
    onSuccess: async (res, variables) => {
      const { user } = res;
      try {
        await axiosPrivateRoute.post("/api/users/register", {
          ...variables,
          uid: user.uid,
          providerId: user.providerData[0].providerId,
          photoUrl: user.photoURL,
        });
        const token = await res.user.getIdToken();
        dispatch({ type: "USER_LOGIN", payload: token });
        toast({
          title: "Welcome to IGotYou",
          description: "We're so excited to have you on board.",
          className: "font-medium bg-[#FFF] text-[#222222]",
        });
      } catch (err) {
        const error = err as AxiosError;
        toast({
          title: "Oops! An error occurred.",
          description: (error.response as AxiosResponse).data.message,
          variant: "destructive",
        });
      }
    },
    onError(err) {
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
    },
  });
}
