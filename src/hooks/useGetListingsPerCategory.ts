import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useToast } from "@/components/ui/use-toast";
import { UserStateContextProvider } from "@/context/UserStateContext";
import { auth } from "@/firebase config/config";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

function useGetListingsPerCategory<T>(category: T) {
  const { dispatch } = useContext(UserStateContextProvider);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: ["listings", category],
    queryFn: async ({ pageParam }) => {
      try {
        return await axiosPrivateRoute.get(
          `/api/listings/${category}/${pageParam}`
        );
      } catch (err) {
        const error = err as AxiosError;
        if (error.response?.status === 400) {
          await auth.signOut();
          localStorage.clear();
          queryClient.removeQueries({ queryKey: ["profile"] });
          queryClient.removeQueries({ queryKey: ["listings"] });
          toast({
            title: "Oops! It looks like your session has expired.",
            description: "Please log in again.",
            variant: "destructive",
          });
        }
        if (error.response?.status === 401) {
          await auth.signOut();
          document.location.reload();
          localStorage.clear();
          dispatch({ type: "USER_LOGOUT", payload: null });
        }
      }
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialPageParam: 1,
    enabled: auth.currentUser != null,
    refetchOnWindowFocus: false,
  });
}

export default useGetListingsPerCategory;
