import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import Flex from "../components/Flex/Flex";
import Header1 from "../components/Header/Header1";
import authApi from "../apis/authApi";
import { useNavigate } from "react-router-dom";

const ArriveButton = styled(Button)`
  width: 100%;
  position: relative;
  background-color: #0d99ff;
  padding: 10px 0;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  max-width: 300px;
  margin-top: 20px;
  &:hover {
    background-color: #007acc;
  }
`;

const Text = styled.h1`
  position: relative;
  bottom: 9px;
  margin-bottom: 40px;
  font-size: 34px;
  font-weight: bold;
`;

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
    <Container>
      <Header1 />
      <Flex direction="column" align="center">
        <Text>어디로 가세요?</Text>
        {addresses.map((address, index) => (
          <ArriveButton
            key={index}
            text={address.address_name}
            onClick={() => handleDestinationClick(address)}
          >
            {address.address_name}
          </ArriveButton>
        ))}
      </Flex>
    </Container>
  );
}

export default ArriveLocation;
