import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";

function useGetReportedUser() {
  return useQuery({
    queryKey: ["reported-user"],
    queryFn: async () => {
      return await axiosPrivateRoute.get(
        `/api/users/reported-user/${sessionStorage.getItem("disabledUser")}`,
      );
    },
    enabled: sessionStorage.getItem("disabledUser") != null,
  });
}

export default useGetReportedUser;
