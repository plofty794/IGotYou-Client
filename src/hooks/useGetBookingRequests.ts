import { axiosPrivateRoute } from "@/api/axiosRoute";
import { auth } from "@/firebase config/config";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetBookingRequests() {
  return useInfiniteQuery({
    queryKey: ["booking-requests", auth.currentUser?.uid],
    queryFn: async ({ pageParam }) => {
      return axiosPrivateRoute.get(`/api/users/booking-requests/${pageParam}`);
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialPageParam: 1,
    enabled: auth.currentUser?.uid != null,
    refetchOnWindowFocus: false,
  });
}

export default useGetBookingRequests;
