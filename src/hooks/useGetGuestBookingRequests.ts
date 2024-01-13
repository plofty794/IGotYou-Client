import { axiosPrivateRoute } from "@/api/axiosRoute";
import { auth } from "@/firebase config/config";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetGuestApprovedBookingRequests() {
  return useInfiniteQuery({
    queryKey: ["guest-booking-requests"],
    queryFn: async ({ pageParam }) => {
      return axiosPrivateRoute.get(`/api/guest-booking-requests/${pageParam}`);
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialPageParam: 1,
    enabled: auth.currentUser?.uid != null,
    refetchOnWindowFocus: false,
  });
}

export default useGetGuestApprovedBookingRequests;
