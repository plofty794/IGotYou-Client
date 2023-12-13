import axios from "axios";

export const axiosRoute = axios.create({
  baseURL: "http://localhost:5030",
});

export const axiosPrivateRoute = axios.create({
  baseURL: "http://localhost:5030",
  withCredentials: true,
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});
