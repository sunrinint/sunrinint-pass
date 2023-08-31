import axios, { AxiosError } from "axios";
import * as dotenv from "dotenv";
import { accessToken } from "../stores/auth";

dotenv.config();

export const apiInstance = () =>
  axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const authInstance = () => {
  const instance = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  let originalRequest: Array<{
    url: string;
    method: string;
    data: string;
  }> = [];

  instance.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${accessToken.get()}`;
    originalRequest.push({
      url: config.url || "",
      method: config.method || "",
      data: JSON.stringify(config.data) || "",
    });
    return config;
  });

  instance.interceptors.response.use(
    (config) => config,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        return await apiInstance()
          .get("/auth/refresh")
          .then(async (res) => {
            accessToken.set(res.data.accessToken);
            const data = await authInstance().request({
              method: originalRequest[0].method,
              url: originalRequest[0].url,
              data: originalRequest[0].data,
            });
            originalRequest = [];
            return data;
          })
          .catch((err: AxiosError) => {
            if (err.response?.status === 401) {
              accessToken.set("");
              window.location.href = "/login";
            }
          });
      }
      return error;
    }
  );

  return instance;
};
