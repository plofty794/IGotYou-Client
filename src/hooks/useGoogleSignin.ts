import { useMutation } from "@tanstack/react-query";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuth, auth } from "@/firebase config/config";
import { FirebaseError } from "firebase/app";
import { toast } from "@/components/ui/use-toast";
import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useContext } from "react";
import { UserStateContextProvider } from "@/context/UserStateContext";

function useGoogleSignin() {
  const { dispatch } = useContext(UserStateContextProvider);
  return useMutation({
    mutationFn: async () => {
      return await signInWithPopup(auth, GoogleAuth);
    },
    onSuccess: async (res) => {
      const { user } = res;
      try {
        await axiosPrivateRoute.post("/api/users/login/google", {
          username: user.displayName,
          email: user.email,
          providerId: user.providerData[0].providerId,
          emailVerified: user.emailVerified,
          uid: res.user.uid,
          photoUrl: res.user.photoURL,
        });
        const token = await res.user.getIdToken();
        dispatch({ type: "USER_LOGIN", payload: token });
      } catch (error) {
        console.error(error);
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

export default useGoogleSignin;
