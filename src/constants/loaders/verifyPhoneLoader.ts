import { axiosPrivateRoute } from "@/api/axiosRoute";
import { auth } from "@/firebase config/config";

export async function verifyPhoneLoader() {
  const token = await auth.currentUser?.getIdToken();
  return await axiosPrivateRoute.get("/api/users/current-user/phone", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
