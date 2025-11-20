import axios from "axios";

const api = axios.create({
  baseURL: "https://api-gs-gamma.vercel.app",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
