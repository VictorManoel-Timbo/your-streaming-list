import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios";

function apiConfig(baseUrl: string): AxiosRequestConfig {
  return {
    baseURL: baseUrl,
    headers: {
      Authorization: import.meta.env.VITE_TOKEN
    }
  };
}

function initAxios(config: AxiosRequestConfig, token?: any): AxiosInstance {
  const defineInstance = axios.create(config);
  defineInstance.interceptors.request.use(
    (request) => {
      return request;
    },
    (error) => Promise.reject(error)
  );

  defineInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      alert(error);
      return Promise.reject(error);
    }
  );

  return defineInstance;
}

function api(baseURL = "/api", token?: any) {
  return initAxios(apiConfig(baseURL), token);
}

export default api;