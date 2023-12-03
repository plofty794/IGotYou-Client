import { axiosPrivateRoute } from "@/api/axiosRoute";
import { SocketContextProvider } from "@/context/SocketContext";
import { UserStateContextProvider } from "@/context/UserStateContext";
import { auth } from "@/firebase config/config";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

function useLogOutUser() {
  const { socket } = useContext(SocketContextProvider);
  const { dispatch } = useContext(UserStateContextProvider);
  const queryClient = useQueryClient();
  return async () => {
    try {
      socket?.emit("user-logout", auth.currentUser?.displayName);
      await axiosPrivateRoute.delete("/api/users/current-user/logout");
      await auth.signOut();
      queryClient.removeQueries();
      dispatch({ type: "USER_LOGOUT", payload: null });
      document.location.reload();
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400) {
        await auth.signOut();
      }
    }
  };
}

export default useLogOutUser;
