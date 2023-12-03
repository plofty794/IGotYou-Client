import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useVisitListing() {
  const { id } = useParams();
  return useQuery({
    queryKey: ["listing", id && id],
    queryFn: async () => {
      return await axiosPrivateRoute.get(`/api/listings/listing/${id}`);
    },
    enabled: id != null,
    refetchOnWindowFocus: false,
  });
}

export default useVisitListing;
