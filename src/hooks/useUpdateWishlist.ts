import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateWishlist() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (listingID: string) => {
      return await axiosPrivateRoute.post(
        "/api/users/current-user/update-wishlist",
        {
          listingID,
        },
      );
    },
    onSuccess() {
      toast({
        title: "Success! 🎉",
        description: "Wishlist has been updated.",
        className: "bg-[#FFF]",
      });
      queryClient.invalidateQueries({ queryKey: ["wishlists"] });
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
    onError(error) {
      console.log(error);
      toast({
        title: "Oops! An error occurred.",
        description: "Try again",
        variant: "destructive",
      });
    },
  });
}

export default useUpdateWishlist;
