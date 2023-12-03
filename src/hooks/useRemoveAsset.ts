import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useMutation } from "@tanstack/react-query";

type TParams = {
  publicId?: string;
};

function useRemoveAsset() {
  return useMutation({
    mutationFn: async (params: TParams) => {
      return await axiosPrivateRoute.delete(
        `/api/cloudinary/delete/${params.publicId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    },
    onSuccess() {
      console.log("Success");
    },
    retry: 2,
  });
}

export default useRemoveAsset;
