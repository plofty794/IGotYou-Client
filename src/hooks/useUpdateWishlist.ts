import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function useUpdateWishlist() {
  const queryClient = useQueryClient();
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
      toast.success("Wishlist has been updated", {
        duration: 800,
      });
      queryClient.invalidateQueries({ queryKey: ["wishlists"] });
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
    onError() {
      toast.error("Oops! An error occurred.", {
        description: "Try again",
      });
    },
  });
}

export default useUpdateWishlist;
