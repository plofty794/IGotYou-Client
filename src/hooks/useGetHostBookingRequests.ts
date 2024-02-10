import { axiosPrivateRoute } from "@/api/axiosRoute";
import { auth } from "@/firebase config/config";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetHostBookingRequests() {
  const status = location.search
    ? location.search.split("?")[1].split("&")[0].split("=")[1]
    : "";
  const requestedBookingDateStartsAt = location.search
    ? location.search
        .split("?")[1]
        .split("&")[1]
        .split("=")[1]
        .split("+")
        .join(" ")
    : "";
  const requestedBookingDateEndsAt = location.search
    ? location.search
        .split("?")[1]
        .split("&")[2]
        .split("=")[1]
        .split("+")
        .join(" ")
    : "";

  return useInfiniteQuery({
    queryKey: ["host-booking-requests"],
    queryFn: async ({ pageParam }) => {
      return axiosPrivateRoute.get(`/api/host-booking-requests/${pageParam}`, {
        params: {
          status,
          requestedBookingDateStartsAt,
          requestedBookingDateEndsAt,
        },
      });
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
