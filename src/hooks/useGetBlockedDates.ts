import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";

function useGetBlockedDates() {
  return useQuery({
    queryKey: ["blocked-dates"],
    queryFn: async () => {
      return await axiosPrivateRoute.get("/api/users/host-blocked-dates");
    },
    refetchOnWindowFocus: false,
  });
}

export default useGetBlockedDates;
