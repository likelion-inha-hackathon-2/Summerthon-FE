import authApi from "./authApi";

// 택시 정보 생성
export const createTaxi = async (taxiData) => {
  try {
    const response = await authApi.post("/taxi", taxiData);
    console.log("Taxi response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating taxi:", error.response.data);
    throw error;
  }
};

// 가장 가까운 택시 찾기
export const getNearbyTaxi = async () => {
  try {
    const response = await authApi.get("/nearby-taxi");
    return response.data;
  } catch (error) {
    console.error("Error getting nearby taxi:", error.response.data);
    throw error;
  }
};

// 모든 택시 목록 가져오기
export const getAllTaxies = async () => {
  try {
    const response = await authApi.get("/taxies");
    return response.data;
  } catch (error) {
    console.error("Error getting all taxies:", error.response.data);
    throw error;
  }
};
