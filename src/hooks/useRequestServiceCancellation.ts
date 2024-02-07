import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { SocketContextProvider } from "@/context/SocketContext";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";

function useRequestServiceCancellation() {
  const { reservationID } = useParams();
  const { socket } = useContext(SocketContextProvider);
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      guestCancelReasons,
    }: {
      guestCancelReasons: string;
    }) => {
      return await axiosPrivateRoute.post(
        `/api/reservations/request-service-cancellation/${reservationID}`,
        {
          guestCancelReasons,
        },
      );
    },
    onSuccess(data) {
      console.log(data);
      socket?.emit("request-service-cancellation", {
        newHostNotification: data.data.newHostNotification,
        receiverName: data.data.receiverName,
      });
      toast({
        title: "Success! 🎉",
        description: "Service cancellation request has been sent.",
        className: "bg-white",
      });
    },
    onError(error) {
      console.error(error);
    },
  });
}

export default useRequestServiceCancellation;
