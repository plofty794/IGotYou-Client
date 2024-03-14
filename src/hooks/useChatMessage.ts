import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { SocketContextProvider } from "@/context/SocketContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";

type TChatMessage = {
  content: string;
  receiverName: string;
};

function useChatMessage() {
  const { toast } = useToast();
  const { conversationID } = useParams();
  const { socket } = useContext(SocketContextProvider);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ content, receiverName }: TChatMessage) => {
      return await axiosPrivateRoute.post(
        `/api/users/current-user/conversations/send-message/${conversationID}`,
        {
          content,
          receiverName,
        },
      );
    },
    onSuccess(data) {
      socket?.emit("chat-message", data.data);
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["conversation", conversationID],
        refetchType: "all",
      });
    },
    onError(error) {
      toast({
        title: "Oops! Message not sent.",
        description: ((error as AxiosError).response as AxiosResponse).data
          .error,
        variant: "destructive",
      });
    },
  });
}

export default useChatMessage;
