import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useGetBookingRequestDetails() {
  const { id } = useParams();
  return useQuery({
    queryKey: ["booking-request", id],
    queryFn: async () => {
      return await axiosPrivateRoute.get(`/api/booking-requests/${id}`);
    },
    enabled: id != null,
    refetchOnWindowFocus: false,
  });
}

export default useGetBookingRequestDetails;
