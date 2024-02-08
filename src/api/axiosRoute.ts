import axios from "axios";

export const axiosPrivateRoute = axios.create({
  baseURL: "https://i-got-you-api.vercel.app/",
  withCredentials: true,
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const axiosRoute = axios.create({
  baseURL: "https://i-got-you-api.vercel.app/",
});
