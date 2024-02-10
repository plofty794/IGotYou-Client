import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";

function useSearchGuest(username: string) {
  return useQuery({
    queryKey: ["guest", username],
    queryFn: async () => {
      return axiosPrivateRoute.get(`/api/search-guest/${username}`);
    },
    enabled: username !== "",
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export default useSearchGuest;
