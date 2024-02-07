import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { SocketContextProvider } from "@/context/SocketContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";

function useDeclineBookingRequest() {
  const { socket } = useContext(SocketContextProvider);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { id } = useParams();

  return useMutation({
    mutationFn: async ({
      bookingRequestID,
      hostDeclineReasons,
    }: {
      bookingRequestID: string;
      hostDeclineReasons: string;
    }) => {
      return await axiosPrivateRoute.patch(
        `/api/host-decline-booking-request/${bookingRequestID}`,
        {
          hostDeclineReasons,
        },
      );
    },
    onSuccess(data) {
      toast({
        title: "Success! 🎉",
        description: data.data.message,
        className: "bg-white",
      });
      socket?.emit("host-decline-bookingRequest", {
        receiverName: data.data.receiverName,
      });
      queryClient.invalidateQueries({
        queryKey: ["host-booking-requests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["booking-request", id],
      });
    },
  });
}

export default useDeclineBookingRequest;
