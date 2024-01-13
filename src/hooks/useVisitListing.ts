import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useVisitListing() {
  const { listingID } = useParams();
  return useQuery({
    queryKey: ["listing", listingID && listingID],
    queryFn: async () => {
      return await axiosPrivateRoute.get(`/api/listings/visit/${listingID}`);
    },
    enabled: listingID != null,
    refetchOnWindowFocus: false,
  });
}

export default useVisitListing;
