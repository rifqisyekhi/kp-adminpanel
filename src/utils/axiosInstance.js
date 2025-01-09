import axios from "axios";
import { getCookie, removeCookie } from "../libs/cookie";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 || error.response.status === 403) {
      const excludedRoutes = ["/auth"];

      const requestUrl = error.config.url;
      const isExcluded = excludedRoutes.some((route) =>
        requestUrl.includes(route)
      );

      if (!isExcluded) {
        removeCookie("authToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
