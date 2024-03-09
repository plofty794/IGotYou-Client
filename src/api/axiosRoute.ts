import axios from "axios";

export const axiosPrivateRoute = axios.create({
  baseURL: "http://localhost:5040",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// https://igot-you.online/api
