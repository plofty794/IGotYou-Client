import { axiosPrivateRoute } from "@/api/axiosRoute";
import { auth } from "@/firebase config/config";
import { useQuery } from "@tanstack/react-query";

function useGetNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      return await axiosPrivateRoute.get(
        "/api/users/current-user/notifications"
      );
    },
    refetchOnWindowFocus: false,
    enabled: auth.currentUser != null,
  });
}

export default useGetNotifications;
