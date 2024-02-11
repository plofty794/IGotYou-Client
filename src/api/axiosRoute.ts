import axios from "axios";

export const axiosPrivateRoute = axios.create({
  baseURL:
    "http://ec2-13-236-193-133.ap-southeast-2.compute.amazonaws.com/api/",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
