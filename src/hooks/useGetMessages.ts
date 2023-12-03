import { axiosPrivateRoute } from "@/api/axiosRoute";
import { auth } from "@/firebase config/config";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetMessages() {
  return useInfiniteQuery({
    queryKey: ["messages", auth.currentUser?.uid],
    queryFn: async ({ pageParam }) => {
      return await axiosPrivateRoute.get(
        `/api/users/current-user/messages/${pageParam}`
      );
    },
    enabled: auth.currentUser?.uid != null,
    initialPageParam: 1,
    getNextPageParam: (_, page) => page.length + 1,
  });
}

export default useGetMessages;
