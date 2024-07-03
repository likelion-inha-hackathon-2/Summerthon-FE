import React, { useState, useEffect } from "react";
import Container from "../components/Container/Container";
import Flex from "../components/Flex/Flex";
import Input from "../components/Input/Input";
import CancleButton from "../components/Button/CancleButton";
import Modal from "../components/Modal/Modal";
import Map from "../components/Map/Map";
import Button from "../components/Button/Button";
import Typo from "../components/Typo/Typo";
import Header1 from "../components/Header/Header1";
import { getAddressToCoordinate } from "../apis/kakaoApi";
import { createTaxi } from "../apis/taxiApi";
import { useLocation } from "react-router-dom";
import Taxi from "../components/Taxi/Taxi";

const Scan = () => {
  const [values, setValues] = useState({
    starting_address: "인천광역시 미추홀구 용현동 292-7", // 고정된 출발지
    destination_address: "",
  });
  const [isDialog, setIsDialog] = useState(false);
  const [route, setRoute] = useState(null);
  const [taxi, setTaxi] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.address) {
      const { address_name, road_address, latitude, longitude } =
        location.state.address;
      setValues({
        ...values,
        destination_address: road_address,
      });
      setRoute({
        startX: "126.651415033662", // 고정된 출발지 좌표
        startY: "37.4482020408321",
        endX: longitude,
        endY: latitude,
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCancel = () => {
    setIsDialog(true);
  };

  const handleClose = () => {
    setIsDialog(false);
  };

  const handleConfirm = () => {
    setIsDialog(false);
    setValues({
      starting_address: "인천광역시 미추홀구 용현동 292-7", // 고정된 출발지
      destination_address: "", // 저장된 주소 불러오기
    });
    setRoute(null);
    setTaxi(null);
  };

  const handleFindRoute = async () => {
    try {
      const startCoords = await getAddressToCoordinate(values.starting_address);
      const destCoords = await getAddressToCoordinate(
        values.destination_address
      );

      if (
        !startCoords.documents ||
        !startCoords.documents[0] ||
        !destCoords.documents ||
        !destCoords.documents[0]
      ) {
        console.error("Invalid coordinates data", startCoords, destCoords);
        alert("주소를 다시 확인하세요.");
        return;
      }

      const routeData = {
        startX: startCoords.documents[0].x,
        startY: startCoords.documents[0].y,
        endX: destCoords.documents[0].x,
        endY: destCoords.documents[0].y,
      };
      setRoute(routeData);

      const taxiData = {
        starting_address: values.starting_address,
        destination_address: values.destination_address,
        latitude: destCoords.documents[0].y,
        longitude: destCoords.documents[0].x,
      };
      const createdTaxi = await createTaxi(taxiData);
      setTaxi(createdTaxi);
    } catch (error) {
      console.error("Error finding route:", error);
    }
  };

  return (
    <div>
      <Container>
        <Header1 />
        <Flex direction="column" align="center">
          <Typo
            text="현재 위치를 보호자에게 전송합니다"
            fontSize="24px"
            fontWeight="bold"
          />
          <Input
            label="출발지"
            name="starting_address"
            placeholder="현 위치"
            value={values.starting_address}
            onChange={handleChange}
            readOnly
          />
          <Input
            label="도착지"
            name="destination_address"
            placeholder="도착지를 입력하세요"
            value={values.destination_address}
            onChange={handleChange}
            readOnly
          />
          <Button text="보호자 호출하기" />
          <Map route={route} />
          <CancleButton onClick={handleCancel} />
        </Flex>
      </Container>
      <Modal
        isDialog={isDialog}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default Scan;
