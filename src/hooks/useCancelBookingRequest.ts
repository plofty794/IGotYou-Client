import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { SocketContextProvider } from "@/context/SocketContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

function useCancelBookingRequest() {
  const { socket } = useContext(SocketContextProvider);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookingRequestID,
      guestCancelReasons,
    }: {
      bookingRequestID: string;
      guestCancelReasons: string;
    }) => {
      return await axiosPrivateRoute.patch(
        `/api/guest-cancel-booking-request/${bookingRequestID}`,
        {
          guestCancelReasons,
        },
      );
    },
    onSuccess(data) {
      toast({
        title: "Success! 🎉",
        description: data.data.message,
        className: "bg-white",
      });
      socket?.emit("guest-cancel-booking-request", {
        receiverName: data.data.receiverName,
      });
      queryClient.invalidateQueries({
        queryKey: ["guest-booking-requests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["guest-pending-booking-requests"],
      });
    },
  });
}

export default useCancelBookingRequest;
