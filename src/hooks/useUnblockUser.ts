import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useMutation } from "@tanstack/react-query";

function useUnblockUser() {
  return useMutation({
    mutationFn: async ({ blockedID }: { blockedID: string }) => {
      return await axiosPrivateRoute.patch(
        `/api/blocked-users/unblock-user/${blockedID}`,
      );
    },
    onSuccess() {
      document.location.reload();
    },
    onError(error) {
      console.log(error);
    },
  });
}

export default useUnblockUser;
