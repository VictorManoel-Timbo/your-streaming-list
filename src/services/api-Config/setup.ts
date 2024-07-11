import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios";

function apiConfig(baseUrl: string): AxiosRequestConfig {
  return {
    baseURL: baseUrl,
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTRjY2RkY2U5MDEwNGI5ZjVlZTRhZGVkNzE2OTAzZiIsIm5iZiI6MTcyMDYxNDI4MS42NDk3NDgsInN1YiI6IjY2OGQ4ZjI5NzIxYmViMmE2MjQ3NTdhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YviovcsmXRHl96pBz28ig0zwVf-W-bfB2WAN4dAimWA'
    }
  };
}

function initAxios(config: AxiosRequestConfig): AxiosInstance {
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

function api(baseURL = "/api") {
  return initAxios(apiConfig(baseURL));
}

export default api;
