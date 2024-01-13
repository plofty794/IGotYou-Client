import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";

function useSearchUser(username: string) {
  return useQuery({
    queryKey: ["search-user", username],
    queryFn: async () => {
      return axiosPrivateRoute.get(`/api/users/search-user/${username}`);
    },
    enabled: username !== "",
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export default useSearchUser;
