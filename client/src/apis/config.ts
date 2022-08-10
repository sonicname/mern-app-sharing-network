import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export default function createAxiosInstance(
  token?: string | null,
  config?: AxiosRequestConfig
): AxiosInstance {
  return axios.create({
    baseURL: "/api/v1",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...config,
  });
}
