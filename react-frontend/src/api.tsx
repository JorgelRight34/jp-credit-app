import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { completeLoadingBar, startLoadingBar } from "./common/LoadingBar";

const api = axios.create({ baseURL: "http://localhost:5270/api/" });

api.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      if (decoded) {
        const tokenExpiration = decoded.exp!;
        const now = Date.now() / 1000;

        if (tokenExpiration > now) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
    }
    startLoadingBar();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    completeLoadingBar();
    return response;
  },
  (error) => {
    if (error instanceof AxiosError) {
      if (error.response) {
        toast.error(error.message);
      }
    } else {
      toast.error("An error has ocurred");
    }
    completeLoadingBar();
    return Promise.reject(error);
  }
);

export default api;
