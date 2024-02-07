import axios from "axios";

export const axiosPrivateRoute = axios.create({
  baseURL: "http://localhost:5050",
  withCredentials: true,
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});
