import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useDeleteConversation() {
  const { conversationId } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (conversationId: string) => {
      return await axiosPrivateRoute.delete(
        `/api/users/current-user/conversations/delete/${conversationId}`
      );
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["conversation", conversationId] });
    },
  });
}

export default useDeleteConversation;
