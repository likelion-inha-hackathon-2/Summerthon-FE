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
