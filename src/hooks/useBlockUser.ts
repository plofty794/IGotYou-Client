import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useMutation } from "@tanstack/react-query";

function useBlockUser() {
  return useMutation({
    mutationFn: async ({
      blockedID,
      reason,
    }: {
      blockedID: string;
      reason: string;
    }) => {
      return await axiosPrivateRoute.patch(
        `/api/blocked-users/block-user/${blockedID}`,
        { reason },
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

export default useBlockUser;
