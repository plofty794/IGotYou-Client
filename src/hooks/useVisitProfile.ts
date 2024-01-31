import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useVisitProfile() {
  const { userID } = useParams();

  return useQuery({
    queryKey: ["visit-profile", userID],
    queryFn: async () =>
      await axiosPrivateRoute.get(`/api/users/profile/visit/${userID}`),
    enabled: userID != null,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

export default useVisitProfile;
