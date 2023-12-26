import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

function useGetHostNotifications() {
  const location = useLocation();

  return useQuery({
    queryKey: ["host-notifications"],
    queryFn: async () => {
      return await axiosPrivateRoute.get(
        "/api/users/current-user/host-notifications"
      );
    },
    refetchOnWindowFocus: false,
    enabled:
      location.pathname.includes("/hosting") ||
      location.pathname.includes("/become-a-host"),
  });
}

export default useGetHostNotifications;
