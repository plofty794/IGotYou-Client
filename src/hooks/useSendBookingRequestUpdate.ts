import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useMutation } from "@tanstack/react-query";
import { SocketContextProvider } from "@/context/SocketContext";
import { useContext } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError, AxiosResponse } from "axios";

function useSendBookingRequestUpdate() {
  const { toast } = useToast();
  const { socket } = useContext(SocketContextProvider);
  return useMutation({
    mutationFn: async (data: {
      bookingRequestID: string;
      receiverName: string;
    }) => {
      return await axiosPrivateRoute.post(
        `/api/host-send-booking-request-update/${data.bookingRequestID}`,
        {
          receiverName: data.receiverName,
        },
      );
    },
    onSuccess(data) {
      socket?.emit("send-bookingRequest-update", {
        newHostNotification: data.data.newHostNotification,
        receiverName: data.data.receiverName,
      });
      toast({
        title: "Success! 🎉",
        description: "Booking request has been updated.",
        className: "bg-white",
      });
    },
    onError(e) {
      const error = e as AxiosError;
      const response = error.response as AxiosResponse;
      toast({
        variant: "destructive",
        title: "Oops! An error occurred.",
        description: response.data.error,
      });
    },
  });
}

export default useSendBookingRequestUpdate;
