import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetReservations() {
  return useInfiniteQuery({
    queryKey: ["reservations"],
    queryFn: async ({ pageParam }) => {
      return await axiosPrivateRoute.get(`/api/reservations/all/${pageParam}`);
    },
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
    refetchOnWindowFocus: false,
  });
}

export default useGetReservations;
