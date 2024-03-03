import axios from "axios";

export const axiosPrivateRoute = axios.create({
  baseURL: "https://igot-you.online/api",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
