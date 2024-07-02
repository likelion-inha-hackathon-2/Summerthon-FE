import axios from "axios";

const kakaoApi = axios.create({
  baseURL: "https://dapi.kakao.com/v2/local/geo/coord2address.json",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
  },
});

// 주소를 위도/경도로 변환하는 함수
export const getAddressToCoordinate = async (address) => {
  try {
    const response = await kakaoApi.get("", {
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

export default kakaoApi;
