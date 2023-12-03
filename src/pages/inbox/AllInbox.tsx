import { useToast } from "@/components/ui/use-toast";
import { SocketContextProvider } from "@/context/SocketContext";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import BookingRequestCard from "./BookingRequestCard";
import PaymentStatus from "./PaymentStatus";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AllInbox({ notification }: { notification: any }) {
  const { toast } = useToast();
  const { socket } = useContext(SocketContextProvider);
  const queryClient = useQueryClient();

  useMemo(() => {
    socket?.on("res", (res) => {
      toast({
        title: "Yey!",
        description: "You have successfully updated the booking request.",
        className: "bg-white font-bold text-black",
      });
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
      console.log(res);
    });
  }, [queryClient, socket, toast]);

  return (
    <>
      {notification.fromAdmin != null && (
        <PaymentStatus notification={notification} />
      )}
      {notification.bookingRequest != null && (
        <BookingRequestCard notification={notification} socket={socket} />
      )}
    </>
  );
}

export default AllInbox;
