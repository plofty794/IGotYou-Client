import { axiosPrivateRoute } from "@/api/axiosRoute";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

function useUnblockUser() {
  return useMutation({
    mutationFn: async ({ blockedID }: { blockedID: string }) => {
      return await axiosPrivateRoute.patch(
        `/api/blocked-users/unblock-user/${blockedID}`,
      );
    },
    onSuccess() {
      toast({
        title: "Success! 🎉",
        description: "User has been unblocked.",
        className: "bg-white",
      });
      setTimeout(() => document.location.reload(), 1500);
    },
    onError(error) {
      console.log(error);
    },
  });
}

export default useUnblockUser;
