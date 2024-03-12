import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

function useBlockUser() {
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
      toast({
        title: "Success! 🎉",
        description: "User has been blocked.",
        className: "bg-white",
      });
      setTimeout(() => window.location.reload(), 1500);
    },
    onError(error) {
      console.log(error);
    },
  });
}

export default useBlockUser;
