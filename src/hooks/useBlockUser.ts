import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useBlockUser() {
  const queryClient = useQueryClient();
  const { userID } = useParams();
  const { toast } = useToast();

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
      queryClient.invalidateQueries({
        queryKey: ["visit-profile", userID],
      });
      toast({
        title: "Success! 🎉",
        description: "User has been blocked.",
      });
    },
    onError(error) {
      console.log(error);
    },
  });
}

export default useBlockUser;
