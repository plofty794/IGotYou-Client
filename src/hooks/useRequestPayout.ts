import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useRequestPayout() {
  const { reservationID } = useParams();

  return useMutation({
    mutationFn: async () => {
      return await axiosPrivateRoute.post(
        `/reservations/request-service-payout/${reservationID}`,
      );
    },
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });
}

export default useRequestPayout;
