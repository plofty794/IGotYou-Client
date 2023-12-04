import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useMutation } from "@tanstack/react-query";

function useAddToWishlist() {
  return useMutation({
    mutationFn: async (listingID: string) => {
      return await axiosPrivateRoute.post("/api/users/current-user/wishlists", {
        listingID,
      });
    },
  });
}

export default useAddToWishlist;
