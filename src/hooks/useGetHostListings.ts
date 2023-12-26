import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetHostListings() {
  return useInfiniteQuery({
    queryKey: ["host-listings"],
    queryFn: async ({ pageParam }) => {
      return await axiosPrivateRoute.get(
        `/api/listings/host-listings/${pageParam}`
      );
    },
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });
}

export default useGetHostListings;
