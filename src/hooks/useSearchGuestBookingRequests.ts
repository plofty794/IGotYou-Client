import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";

function useSearchGuestBookingRequests(search: string) {
  return useQuery({
    queryKey: ["booking-requests", search],
    queryFn: async () => {
      return await axiosPrivateRoute.get(
        `/api/guest-booking-requests?search=${search}`
      );
    },
    enabled: search.length > 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export default useSearchGuestBookingRequests;
