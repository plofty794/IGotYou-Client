import { axiosPrivateRoute } from "@/api/axiosRoute";
import { auth } from "@/firebase config/config";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetListingsPerCategory<T>(category: T) {
  return useInfiniteQuery({
    queryKey: ["listings", category],
    queryFn: async ({ pageParam }) => {
      return await axiosPrivateRoute.get(
        `/api/listings/${category}/${pageParam}`,
      );
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialPageParam: 1,
    enabled: auth.currentUser != null,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

export default useGetListingsPerCategory;
