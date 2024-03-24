import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useConfirmServiceEnded() {
  const { reservationID } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      return await axiosPrivateRoute.post(
        `/api/reservations/confirm-service-ended/${reservationID}`,
      );
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["reservation", reservationID],
      });
      toast({
        title: "Success! 🎉",
        description: data.data.message,
        className: "bg-white",
      });
    },
  });
}

export default useConfirmServiceEnded;
