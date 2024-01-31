import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

function useChangeAvailability() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ sortedDates }: { sortedDates: Date[] }) => {
      if (!sortedDates.length) return;
      return axiosPrivateRoute.post(`/api/users/host-change-availability`, {
        sortedDates,
      });
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["blocked-dates"],
      });
      toast({
        title: "Success! 🎉",
        description: data?.data.message,
        className: "bg-white",
      });
    },
    onError(error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: ((error as AxiosError).response as AxiosResponse).data
          .error,
        variant: "destructive",
      });
    },
  });
}

export default useChangeAvailability;
