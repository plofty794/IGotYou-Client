import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";

function useGetWishlists() {
  return useQuery({
    queryKey: ["wishlists"],
    queryFn: async () => {
      return await axiosPrivateRoute.get("/api/users/current-user/wishlists");
    },
    refetchOnWindowFocus: false,
  });

  // return useInfiniteQuery({
  //   queryKey: ["wishlists"],
  //   queryFn: async ({ pageParam }) => {
  //     return await axiosPrivateRoute.get(
  //       `/api/users/current-user/wishlists/${pageParam}`
  //     );
  //   },
  //   initialPageParam: 1,
  //   getNextPageParam: (_, page) => page.length + 1,
  //   refetchOnWindowFocus: false,
  // });
}

export default useGetWishlists;
