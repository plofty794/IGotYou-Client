import axios from "axios";

export const axiosPrivateRoute = axios.create({
  baseURL: "http://ec2-54-206-111-44.ap-southeast-2.compute.amazonaws.com:5050",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
