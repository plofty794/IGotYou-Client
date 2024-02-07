import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useSendReservationPaymentToAdmin() {
  const { reservationID } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      paymentRefNo,
      paymentType,
      expectedPaymentAmount,
      paymentProofPhoto,
    }: {
      paymentRefNo?: string;
      paymentType?: string;
      expectedPaymentAmount?: string;
      paymentProofPhoto?: {
        public_id: string;
        secure_url: string;
        thumbnail_url: string;
      };
    }) => {
      return await axiosPrivateRoute.post(
        `/api/reservations/send-payment/${reservationID}`,
        {
          paymentRefNo,
          paymentType,
          expectedPaymentAmount,
          paymentProofPhoto,
        },
      );
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["reservation", reservationID],
      });
      toast({
        title: "Payment success! 🎉",
        description: data.data.message,
        className: "bg-white",
      });
    },
    onError(error?) {
      console.error(error);
    },
  });
}

export default useSendReservationPaymentToAdmin;
