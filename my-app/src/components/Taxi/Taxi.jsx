import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import { createTaxi } from "../../apis/taxiApi";

const TaxiContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const Taxi = () => {
  const [message, setMessage] = useState("");

  const handleCreateTaxi = async () => {
    const taxiData = {
      license_number: "",
      latitude: "5",
      longitude: "",
      driver_name: "",
      driver_phone: "",
      acceptance: 1, //
    };

    try {
      const response = await createTaxi(taxiData);
      setMessage("택시 정보가 성공적으로 생성되었습니다.");
      console.log("Created Taxi:", response);
    } catch (error) {
      setMessage("택시 정보 생성에 실패했습니다.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <TaxiContainer>
        <Button text="택시 호출하기" onClick={handleCreateTaxi} />
        {message && <p>{message}</p>}
      </TaxiContainer>
    </div>
  );
};

export default Taxi;
