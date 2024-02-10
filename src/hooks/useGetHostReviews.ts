import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetHostReviews() {
  return useInfiniteQuery({
    queryKey: ["host-reviews"],
    queryFn: async ({ pageParam }) => {
      return await axiosPrivateRoute.get(
        `/api/ratings/host-reviews/${pageParam}`,
      );
    },
    getNextPageParam: (_, pages) => pages.length + 1,
    initialPageParam: 1,
  });
}

export default useGetHostReviews;
