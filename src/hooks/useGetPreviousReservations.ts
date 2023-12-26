import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetPreviousReservations() {
  return useInfiniteQuery({
    queryKey: ["reservations", "current"],
    queryFn: async ({ pageParam }) => {
      return await axiosPrivateRoute.get(
        `/api/reservations/previous/${pageParam}`
      );
    },
    initialPageParam: 1,
    getNextPageParam: (_, page) => page.length + 1,
  });
}

export default useGetPreviousReservations;
