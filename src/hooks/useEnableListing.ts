import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useEnableListing() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ listingID }: { listingID: string }) => {
      return await axiosPrivateRoute.patch(
        `/api/listings/enable-listing/${listingID}`
      );
    },
    onSuccess(data) {
      toast({
        title: "Success! 🎉",
        description: data.data.message,
        className: "bg-white",
      });
      queryClient.invalidateQueries({
        queryKey: ["host-listings"],
      });
    },
  });
}

export default useEnableListing;
