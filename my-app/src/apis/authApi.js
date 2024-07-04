import axios from "axios";

const authApi = axios.create({
  baseURL: "http://3.36.172.57",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 토큰 인터셉터 요청
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default authApi;
