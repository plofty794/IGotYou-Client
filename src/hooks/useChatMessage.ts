import { axiosPrivateRoute } from "@/api/axiosRoute";
import { SocketContextProvider } from "@/context/SocketContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";

type TChatMessage = {
  content: string;
  receiverName: string;
};

function useChatMessage() {
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
        }
      );
    },
    onSuccess(data) {
      socket?.emit("chat-message", data.data);
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
      queryClient.invalidateQueries({
        queryKey: ["conversation", conversationID],
      });
    },
    onError(error) {
      console.log(error);
    },
  });
}

export default useChatMessage;
