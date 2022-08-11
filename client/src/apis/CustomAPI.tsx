import axios, { AxiosInstance } from "axios";
import { NavigateFunction } from "react-router-dom";

interface ICustomAPIParams {
  token: string | null;
  logout: () => void;
  navigate: NavigateFunction;
}

const customAPI = ({
  token = null,
  navigate,
  logout,
}: ICustomAPIParams): AxiosInstance => {
  const instance = axios.create({
    baseURL: "/api/v1",
  });

  instance.interceptors.request.use(
    (config) => {
      // @ts-ignore
      config.headers.common["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (error.response.status === 401) {
        logout();
        navigate("/signin");
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default customAPI;
