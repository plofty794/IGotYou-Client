import { axiosPrivateRoute } from "@/api/axiosRoute";
import { auth } from "@/firebase config/config";
import { useQuery } from "@tanstack/react-query";

function useGetConversations() {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      return await axiosPrivateRoute.get(
        "/api/users/current-user/conversations"
      );
    },
    enabled: auth.currentUser != null,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export default useGetConversations;
