import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationID: string) => {
      return await axiosPrivateRoute.patch(
        "/api/users/current-user/update-notification",
        { notificationID }
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export default useUpdateNotification;
