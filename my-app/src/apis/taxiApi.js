import authApi from "./authApi";

// 출발지 근처 택시 정보 가져오기
export const getNearbyTaxi = async (locationData) => {
  try {
    const response = await authApi.post("/call-taxi", locationData);
    console.log("Nearby Taxi response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error getting nearby taxi:",
      error.response?.data || error.message
    );
    throw error;
  }
};
