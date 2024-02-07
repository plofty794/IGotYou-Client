import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useParams } from "react-router-dom";

function useRateUser() {
  const { reservationID } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      reservationID,
      hostID,
      guestID,
      feedback,
      userRating,
    }: {
      reservationID: string;
      hostID: string;
      guestID: string;
      feedback: string;
      userRating: number;
    }) => {
      return await axiosPrivateRoute.post("/api/users/rate-user", {
        reservationID,
        hostID,
        guestID,
        feedback,
        userRating,
      });
    },
    onSuccess() {
      toast({
        title: "Success! 🎉",
        description: "Rating has been sent.",
        className: "bg-white",
      });
      queryClient.invalidateQueries({
        queryKey: ["reservation", reservationID],
      });
    },
    onError(error) {
      console.error(error);
      toast({
        title: "Uh oh! Rating failed.",
        description: ((error as AxiosError).response as AxiosResponse).data
          .error,
        variant: "destructive",
      });
    },
  });
}

export default useRateUser;
