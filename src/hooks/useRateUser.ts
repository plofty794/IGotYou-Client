import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

function useRateUser() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      reservationID,
      hostID,
      guestID,
      guestFeedback,
      hostFeedback,
      hostRating,
      guestRating,
    }: {
      reservationID: string;
      hostID: string;
      guestID: string;
      guestFeedback?: string;
      hostFeedback?: string;
      hostRating?: number;
      guestRating?: number;
    }) => {
      return await axiosPrivateRoute.post("/api/users/rate-user", {
        reservationID,
        hostID,
        guestID,
        guestFeedback,
        hostFeedback,
        hostRating,
        guestRating,
      });
    },
    onSuccess() {
      toast({
        title: "Success! 🎉",
        description: "Rating has been sent.",
        className: "bg-white",
      });
      document.location.reload();
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
