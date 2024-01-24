import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";

function useGetGuestNotifications() {
  return useQuery({
    queryKey: ["guest-notifications"],
    queryFn: async () => {
      return await axiosPrivateRoute.get(
        "/api/users/current-user/guest-notifications",
      );
    },
    refetchOnWindowFocus: false,
  });
}

export default useGetGuestNotifications;
