import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TData = {
  listingID: string;
  listingDuration: number;
};
function useRenewListing() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: TData) => {
      return await axiosPrivateRoute.patch(
        `/api/listings/renew-listing/${data.listingID}`,
        {
          listingDuration: data.listingDuration,
        }
      );
    },
    onSuccess(data) {
      toast({
        title: "Success!",
        description: data.data.message + ".",
        className: "bg-white",
      });
      queryClient.invalidateQueries({
        queryKey: ["host-listings"],
      });
    },
  });
}

export default useRenewListing;
