import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetUpcomingReservations() {
  return useInfiniteQuery({
    queryKey: ["reservations", "upcoming"],
    queryFn: async ({ pageParam }) => {
      return await axiosPrivateRoute.get(
        `/api/reservations/upcoming/${pageParam}`
      );
    },
    initialPageParam: 1,
    getNextPageParam: (_, page) => page.length + 1,
  });
}

export default useGetUpcomingReservations;
