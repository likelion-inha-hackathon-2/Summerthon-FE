import axios from "axios";

// 택시 정보 생성
export const createTaxi = async (taxiData) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/taxi",
      {
        ...taxiData,
        latitude: parseFloat(taxiData.latitude),
        longitude: parseFloat(taxiData.longitude),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Taxi response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating taxi:", error.response.data);
    throw error;
  }
};

// 생성한 택시 데이터를 리턴
export const getTaxiData = async () => {
  try {
    const response = await axios.get("http://localhost:8000/taxi", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("get Taxi return response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "get taxi data err:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
