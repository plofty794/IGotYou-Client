import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useGetHostData() {
  const { id } = useParams();

  return useQuery({
    queryKey: ["host", id],
    queryFn: async () => {
      return await axiosPrivateRoute.get(`api/users/profile/visit/${id}`);
    },
    enabled: id != null,
    refetchOnWindowFocus: false,
  });
}

export default useGetHostData;
