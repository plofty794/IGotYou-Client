import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useGetReservationDetails() {
  const { reservationID } = useParams();

  return useQuery({
    queryKey: ["reservation", reservationID],
    queryFn: async () => {
      return await axiosPrivateRoute.get(
        `/api/reservation-details/${reservationID}`,
      );
    },
    enabled: reservationID != null,
  });
}

export default useGetReservationDetails;
