import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosPrivateRoute } from "@/api/axiosRoute";

type TFileType = {
  public_id: string;
  secure_url: string;
  original_filename: string;
  format: string;
  thumbnail_url: string;
  resource_type: string;
};

type TListing = {
  serviceType: string;
  serviceDescription?: string;
  listingAssets: TFileType[];
};

function useUploadListing() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TListing) => {
      return await axiosPrivateRoute.post("/api/listings/make-a-listing", {
        ...data,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["profile", id], exact: true });
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
    onError(error) {
      console.error(error);
    },
  });
}

export default useUploadListing;
