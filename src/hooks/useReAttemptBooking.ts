import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

function useReAttemptBooking() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ bookingRequestID }: { bookingRequestID: string }) => {
      return await axiosPrivateRoute.patch(
        `api/guest-reAttempt-booking-request/${bookingRequestID}`,
      );
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["guest-cancelled-booking-requests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["guest-booking-requests"],
      });
      toast({
        title: "Success! 🎉",
        description: data.data.message,
        className: "bg-white",
      });
    },
    onError(error) {
      if (error.message.includes("429")) {
        toast({
          title: "Too many re-attempts!",
          description: ((error as AxiosError).response as AxiosResponse).data
            .error,
          variant: "destructive",
        });
      } else if (error.message.includes("400")) {
        console.error(error);
        toast({
          title: "Oops! Re-attempt failed.",
          description: ((error as AxiosError).response as AxiosResponse).data
            .message,
          variant: "destructive",
        });
      }
    },
  });
}

export default useReAttemptBooking;
