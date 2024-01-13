import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

function useCreateConversation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (receiverName: string) => {
      return await axiosPrivateRoute.post(
        "/api/users/current-user/conversations/create",
        { receiverName }
      );
    },
    onSuccess(data) {
      console.log(data.data);
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      return toast({
        title: "Success!",
        description: "Conversation has been created.",
        className: "bg-white font-bold",
      });
    },
    onError(err) {
      const error = err as AxiosError;
      const response = error.response as AxiosResponse;
      toast({
        variant: "destructive",
        title: "Oops! An error occurred.",
        description: response.data.error,
      });
    },
  });
}

export default useCreateConversation;
