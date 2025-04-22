import axios from "axios";

export const axiosInstanace = axios.create({
  baseURL: import.meta.env.MODE==="development" ? "http://localhost:4001/api": "/api",
  withCredentials: true,
});
