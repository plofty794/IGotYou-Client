import { axiosPrivateRoute } from "@/api/axiosRoute";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useParams } from "react-router-dom";

function useRequestPayout() {
  const { reservationID } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mobilePhone: string) => {
      return await axiosPrivateRoute.post(
        `/api/reservations/request-service-payout/${reservationID}`,
        {
          mobilePhone,
        },
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
    onError(e) {
      const error = e as AxiosError;
      const response = error.response as AxiosResponse;
      toast({
        variant: "destructive",
        title: "Uh oh! Request not sent.",
        description: response.data.error,
      });
    },
  });
}

export default useRequestPayout;
