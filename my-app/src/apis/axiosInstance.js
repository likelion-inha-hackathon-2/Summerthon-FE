import axios from "axios";

// Axios 모듈화 하기(https://1yoouoo.tistory.com/36)
const axiosInstance = axios.create({
  baseURL: "https://dapi.kakao.com/v2/local/geo/coord2address.json",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
  },
});

// localStorage에서 인가(Authorization)가 필요한 사이트에서 token 전달
const accessToken = localStorage.getItem("accessToken");
if (accessToken) {
  axiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken}`;
}

// 요청 인터셉터 토큰 설정
axiosInstance.interceptors.request.use(
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

// 응답 인터셉터 토큰 갱신
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          "http://localhost:8000/token/refresh",
          { refresh: refreshToken }
        );
        const { accessToken: newAccessToken } = response.data;
        localStorage.setItem("accessToken", newAccessToken);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// 주소를 위도 경도로 변환
export const getAddressToCoordinate = async (address) => {
  try {
    const response = await axiosInstance.get("", {
      params: {
        query: address,
        input_coord: "WGS84",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching coordinates from address:", error);
    throw error;
  }
};

export default axiosInstance;
