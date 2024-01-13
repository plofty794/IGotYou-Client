import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetGuestDeclinedBookingRequests() {
  return useInfiniteQuery({
    queryKey: ["guest-declined-booking-requests"],
    queryFn: async ({ pageParam }) => {
      return axiosPrivateRoute.get(
        `/api/guest-declined-booking-requests/${pageParam}`
      );
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  });
}

export default useGetGuestDeclinedBookingRequests;
