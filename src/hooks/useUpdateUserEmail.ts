import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/firebase config/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateUserEmail() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const id = auth.currentUser?.uid;
  return useMutation({
    mutationFn: async (email: string) => {
      return await axiosPrivateRoute.patch(
        "/api/users/current-user/update-email",
        { email, id }
      );
    },
    onSuccess(_, variables) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["profile", id], (prevData: any) => {
        return {
          data: {
            activeListings: prevData.data.activeListings,
            user: {
              ...prevData.data.user,
              variables,
            },
          },
        };
      });
      queryClient.invalidateQueries({ queryKey: ["profile", id] });
      toast({
        title: "Success! 🎉",
        description: "Your profile has been updated.",
        className: "bg-[#FFF] font-bold",
      });
    },
  });
}

export default useUpdateUserEmail;
