import axios from "axios";

const kakaoApi = axios.create({
  baseURL: "https://dapi.kakao.com/v2/local",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
  },
});

const naviApi = axios.create({
  baseURL: "https://apis-navi.kakaomobility.com/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
  },
});

// 주소를 위도/경도로 변환하는 함수
export const getAddressToCoordinate = async (address) => {
  if (!address) {
    throw new Error("주소가 비어있습니다.");
  }
  try {
    const response = await kakaoApi.get("/search/address.json", {
      params: {
        query: address,
      },
    });
    console.log("getAddressToCoordinate response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching coordinates from address:", error);
    throw error;
  }
};

// 좌표를 주소로 변환하는 함수
export const getCoordinateToAddress = async (x, y) => {
  try {
    const response = await kakaoApi.get("/geo/coord2address.json", {
      params: {
        x: x,
        y: y,
        input_coord: "WGS84",
      },
    });
    console.log("getCoordinateToAddress response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching address from coordinates:", error);
    throw error;
  }
};

// 카카오 네비를 이용해 경로를 찾는 함수
export const getRoute = async (startX, startY, endX, endY) => {
  try {
    const response = await naviApi.get("/directions", {
      params: {
        origin: `${startX},${startY}`,
        destination: `${endX},${endY}`,
        priority: "RECOMMEND",
        car_fuel: "GASOLINE",
        car_hipass: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching route from coordinates:", error);
    throw error;
  }
};

export default kakaoApi;
