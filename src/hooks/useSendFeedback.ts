import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useMutation } from "@tanstack/react-query";

function useSendFeedback() {
  return useMutation({
    mutationFn: async (feedback: string) => {
      return await axiosPrivateRoute.post("/api/users/write-a-feedback", {
        feedback,
      });
    },
  });
}

export default useSendFeedback;
