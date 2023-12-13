import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useGetConversation() {
  const { conversationId } = useParams();

  return useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: async () => {
      return await axiosPrivateRoute.get(
        `/api/users/current-user/conversations/${conversationId}`
      );
    },
    enabled: conversationId != null,
  });
}

export default useGetConversation;
