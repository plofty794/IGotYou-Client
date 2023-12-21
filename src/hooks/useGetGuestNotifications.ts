import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

function useGetGuestNotifications() {
  const location = useLocation();

  return useQuery({
    queryKey: ["guest-notifications"],
    queryFn: async () => {
      return await axiosPrivateRoute.get(
        "/api/users/current-user/guest-notifications"
      );
    },
    refetchOnWindowFocus: false,
    enabled: !location.pathname.includes("/hosting"),
  });
}

export default useGetGuestNotifications;
