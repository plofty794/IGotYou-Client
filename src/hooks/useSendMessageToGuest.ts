import { axiosPrivateRoute } from "@/api/axiosRoute";
import { toast } from "sonner";
import { SocketContextProvider } from "@/context/SocketContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { useToast } from "@/components/ui/use-toast";

type TMessageHost = {
  content: string;
  guestID: string;
};

function useSendMessageToGuest() {
  const defaultToast = useToast();
  const navigate = useNavigate();
  const { socket } = useContext(SocketContextProvider);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TMessageHost) => {
      return await axiosPrivateRoute.post(
        "/api/users/current-user/conversations/send-message-to-guest/",
        {
          ...data,
        },
      );
    },
    onSuccess(data) {
      toast.success("Message has been sent.", {
        action: {
          label: "View Message",
          onClick: () =>
            navigate(`/messages/conversation/${data.data.conversationID}`),
        },
        actionButtonStyle: {
          backgroundColor: "#008A2E",
          color: "#ECFDF3",
          border: "1px solid #ECFDF3",
          borderRadius: "4px",
        },
        duration: 4000,
      });
      socket?.emit("message-guest", data.data);
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
      queryClient.invalidateQueries({
        queryKey: ["conversation", data.data.conversationID],
      });
    },
    onError(e) {
      const error = e as AxiosError;
      const response = error.response as AxiosResponse;
      defaultToast.toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.data.error,
      });
    },
  });
}

export default useSendMessageToGuest;
