import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetCurrentReservations() {
  return useInfiniteQuery({
    queryKey: ["reservations", "current"],
    queryFn: async ({ pageParam }) => {
      return await axiosPrivateRoute.get(
        `/api/reservations/current/${pageParam}`
      );
    },
    initialPageParam: 1,
    getNextPageParam: (_, page) => page.length + 1,
  });
}

export default useGetCurrentReservations;
