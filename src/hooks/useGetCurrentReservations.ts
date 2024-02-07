import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";

function useGetCurrentReservations() {
  return useQuery({
    queryKey: ["reservations", "current"],
    queryFn: async () => {
      return await axiosPrivateRoute.get("/api/reservations/current");
    },
    refetchOnWindowFocus: false,
  });
}

export default useGetCurrentReservations;
