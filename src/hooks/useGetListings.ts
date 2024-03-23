import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosPrivateRoute } from "@/api/axiosRoute";
import { auth } from "@/firebase config/config";

function useGetListings() {
  const minPrice = location.search
    .match(/\?(\w+)=.*/)?.[0]
    .split("?")[1]
    .split("&")[0]
    .split("=")[1];

  const maxPrice = location.search
    .match(/\?(\w+)=.*/)?.[0]
    .split("?")[1]
    .split("&")[1]
    .split("=")[1];

  const serviceType = location.search
    .match(/\?(\w+)=.*/)?.[0]
    .split("?")[1]
    .split("&")[2]
    .split("=")[1]
    .split("+")
    .join(" ");

  return useInfiniteQuery({
    queryKey: ["listings"],
    queryFn: async ({ pageParam }) =>
      await axiosPrivateRoute.get(`/api/listings/${pageParam}`, {
        params: {
          minPrice,
          maxPrice,
          serviceType,
        },
      }),

    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialPageParam: 1,
    enabled: auth.currentUser != null && localStorage.getItem("token") != null,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

export default useGetListings;
