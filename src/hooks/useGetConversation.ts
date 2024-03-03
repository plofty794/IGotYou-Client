import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useGetConversation() {
  const { conversationID } = useParams();

  return useQuery({
    queryKey: ["conversation", conversationID],
    queryFn: async () => {
      return await axiosPrivateRoute.get(
        `/api/users/current-user/conversations/${conversationID}`,
      );
    },
    enabled: conversationID != null,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export default useGetConversation;
