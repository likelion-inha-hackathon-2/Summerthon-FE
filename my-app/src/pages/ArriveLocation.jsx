import React, { useState, useEffect } from "react";
import Button from "../components/Button/Button";
import Typo from "../components/Typo/Typo";
import Flex from "../components/Flex/Flex";
import Header1 from "../components/Header/Header1";
import authApi from "../apis/authApi";
import { useNavigate } from "react-router-dom";

function ArriveLocation() {
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        // 저장된 주소지 정보 불러오기
        const response = await authApi.get("/addresses");
        setAddresses(response.data.addresses);
      } catch (error) {
        console.error("err", error);
      }
    };
    fetchAddresses();
  }, []);

  const handleDestinationClick = (address) => {
    // QR 스캔 페이지로 이동
    navigate("/scan", { state: { address } });
  };

  return (
    <>
      <Header1 />
      <Flex direction="column" align="center">
        <Typo text="어디로 호출할까요?" fontSize="28px" fontWeight="bold" />
        <Typo
          text="주소지 목록을 불러왔어요."
          fontSize="14px"
          color="gray"
          style={{ marginTop: 0 }}
        />
        {/* 주소지 목록을 동적으로 업데이트합니다. */}
        {addresses.map((address, index) => (
          <Button
            key={index}
            text={address.address_name}
            onClick={() => handleDestinationClick(address)}
          >
            {address.address_name}
          </Button>
        ))}
      </Flex>
    </>
  );
}

export default ArriveLocation;
