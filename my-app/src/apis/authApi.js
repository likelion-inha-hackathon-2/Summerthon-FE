import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:8000", 
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          "http://localhost:8000/token/refresh", // 토큰 갱신 URL 확인 필요
          { refresh: refreshToken }
        );
        const { accessToken: newAccessToken } = response.data;
        localStorage.setItem("accessToken", newAccessToken);
        authApi.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return authApi(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default authApi;
