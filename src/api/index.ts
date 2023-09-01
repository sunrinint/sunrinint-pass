import axios, { AxiosError } from "axios";
import { accessToken } from "../stores/auth";

export const apiInstance = () =>
  axios.create({
    baseURL: import.meta.env.PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const authInstance = () => {
  const instance = axios.create({
    baseURL: import.meta.env.PUBLIC_API_URL,
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

  console.log(accessToken.get());

  instance.interceptors.response.use(
    (config) => config,
    async (error: AxiosError) => {
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
          accessToken.set("");
          window.location.href = "/login";
        });
      return error;
    }
  );

  return instance;
};
