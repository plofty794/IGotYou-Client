import { axiosPrivateRoute } from "@/api/axiosRoute";
import { auth } from "@/firebase config/config";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetGuestPendingBookingRequests() {
  return useInfiniteQuery({
    queryKey: ["guest-pending-booking-requests"],
    queryFn: async ({ pageParam }) => {
      return axiosPrivateRoute.get(
        `/api/guest-pending-booking-requests/${pageParam}`
      );
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialPageParam: 1,
    enabled: auth.currentUser?.uid != null,
    refetchOnWindowFocus: false,
  });
}

export default useGetGuestPendingBookingRequests;
