import React, { useState } from "react";
import Container from "../components/Container/Container";
import Flex from "../components/Flex/Flex";
import Input from "../components/Input/Input";
import CancleButton from "../components/Button/CancleButton";
import Modal from "../components/Modal/Modal";
import Map from "../components/Map/Map";
import Button from "../components/Button/Button";
import Typo from "../components/Typo/Typo";
import { getAddressToCoordinate } from "../apis/kakaoApi";

const Call = () => {
  const [values, setValues] = useState({
    starting_address: "",
    destination_address: "",
  });
  const [isDialog, setIsDialog] = useState(false);
  const [route, setRoute] = useState(null);

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
      starting_address: "",
      destination_address: "",
    });
    setRoute(null);
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
        alert(
          "유효한 좌표 데이터를 가져오지 못했습니다. 주소를 다시 확인하세요."
        );
        return;
      }

      const routeData = {
        startX: startCoords.documents[0].x,
        startY: startCoords.documents[0].y,
        endX: destCoords.documents[0].x,
        endY: destCoords.documents[0].y,
      };
      setRoute(routeData);
    } catch (error) {
      console.error("Error finding route:", error);
    }
  };

  const handleStartNavigation = () => {
    if (route) {
      const url = `https://map.kakao.com/link/to/${encodeURIComponent(
        values.destination_address
      )},${route.endY},${route.endX}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div>
      <Container>
        <Flex direction="column" align="center">
          <Typo
            text="어디로 택시를 호출할까요?"
            fontSize="28px"
            fontWeight="bold"
          />
          <Input
            label="출발지"
            name="starting_address"
            placeholder="출발지를 입력하세요"
            value={values.starting_address}
            onChange={handleChange}
          />
          <Input
            label="도착지"
            name="destination_address"
            placeholder="도착지를 입력하세요"
            value={values.destination_address}
            onChange={handleChange}
          />
          <Button text="택시 호출하기" onClick={handleFindRoute} />
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

export default Call;
