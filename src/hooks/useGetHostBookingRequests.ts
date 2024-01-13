import { axiosPrivateRoute } from "@/api/axiosRoute";
import { auth } from "@/firebase config/config";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetHostBookingRequests() {
  return useInfiniteQuery({
    queryKey: ["host-booking-requests"],
    queryFn: async ({ pageParam }) => {
      return axiosPrivateRoute.get(`/api/host-booking-requests/${pageParam}`);
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialPageParam: 1,
    enabled: auth.currentUser?.uid != null,
    refetchOnWindowFocus: false,
  });
}

export default useGetHostBookingRequests;
