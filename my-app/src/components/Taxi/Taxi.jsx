import React, { useEffect, useState } from "react";
import Typo from "../Typo/Typo";
import { getTaxiData } from "../../apis/taxiApi";

const Taxi = () => {
  const [taxiData, setTaxiData] = useState([]);

  useEffect(() => {
    const fetchTaxiData = async () => {
      try {
        const data = await getTaxiData();
        setTaxiData(data);
      } catch (error) {
        console.error("Error fetching taxi data:", error);
      }
    };
    fetchTaxiData();
  }, []);

  return (
    <div>
      {taxiData.length > 0 ? (
        taxiData.map((taxi, index) => (
          <Typo
            key={index}
            text={`택시 번호: ${taxi.license_number}, 기사 이름: ${taxi.driver_name}, 기사 전화번호: ${taxi.driver_phone}`}
          />
        ))
      ) : (
        <Typo text="등록된 택시 정보가 없습니다." />
      )}
    </div>
  );
};

export default Taxi;
