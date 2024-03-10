import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { SocketContextProvider } from "@/context/SocketContext";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
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
    onError(e) {
      const error = e as AxiosError;
      const response = error.response as AxiosResponse;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.data.error,
      });
    },
  });
}

export default useRequestServiceCancellation;
