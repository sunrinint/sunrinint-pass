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

function refresh() {
  return apiInstance()
    .get("/auth/refresh")
    .then((res) => (accessToken.set(res.data.accessToken), res))
    .catch((err: AxiosError) => {
      if (err.response?.status === 401) {
        accessToken.set("");
        window.location.href = "/login";
      }
    });
}

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

  instance.interceptors.request.use(async (config) => {
    if (accessToken.get() === "") await refresh();
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
        return await refresh()
          .then(async (res) => {
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
