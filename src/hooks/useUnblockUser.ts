import { axiosPrivateRoute } from "@/api/axiosRoute";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useUnblockUser() {
  const queryClient = useQueryClient();
  const { userID } = useParams();
  return useMutation({
    mutationFn: async ({ blockedID }: { blockedID: string }) => {
      return await axiosPrivateRoute.patch(
        `/api/blocked-users/unblock-user/${blockedID}`,
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["visit-profile", userID],
      });
      toast({
        title: "Success! 🎉",
        description: "User has been unblocked.",
      });
    },
    onError(error) {
      console.log(error);
    },
  });
}

export default useUnblockUser;
