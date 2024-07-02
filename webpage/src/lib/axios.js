import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:2000/api",
  headers: {
    "Content-Type": "application/json",
    "x-access-token": localStorage.getItem("token") || "",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
export default api;
