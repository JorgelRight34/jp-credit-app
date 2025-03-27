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
      switch (error.code) {
        case "ERR_NETWORK":
          toast.error(
            "Connection refused. Make sure to have a stable connection."
          );
          break;
        case "ERR_BAD_RESPONSE":
          toast.error("Oops!, internal server error.");
          break;
        case "ERR_BAD_REQUEST":
          switch (error.response?.status) {
            case 404:
              toast.error("Not found.");
              break;
            case 400:
              toast.error("Bad request");
              break;
          }
          break;
        default:
          toast.error("An error has ocurred.");
          break;
      }
    } else {
      toast.error("An error has ocurred");
    }

    completeLoadingBar();
    return Promise.reject(error);
  }
);

export default api;
