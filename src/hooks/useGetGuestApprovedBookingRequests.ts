import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetApprovedBookingRequests() {
  return useInfiniteQuery({
    queryKey: ["guest-approved-booking-requests"],
    queryFn: async ({ pageParam }) => {
      return axiosPrivateRoute.get(
        `/api/guest-approved-booking-requests/${pageParam}`
      );
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  });
}

export default useGetApprovedBookingRequests;
