import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useConfirmServiceEnded() {
  const { reservationID } = useParams();
  return useMutation({
    mutationFn: async () => {
      return await axiosPrivateRoute.post(
        `/api/reservations/confirm-service-ended/${reservationID}`,
      );
    },
    onSuccess(data) {
      console.log(data);
    },
  });
}

export default useConfirmServiceEnded;
