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
import { getAddressToCoordinate, getRoute } from "../apis/kakaoApi";
import { createTaxi } from "../apis/taxiApi";
import { useLocation } from "react-router-dom";
import Taxi from "../components/Taxi/Taxi";

const Scan = () => {
  const [values, setValues] = useState({
    starting_address: "인천광역시 미추홀구 용현동 292-7",
    destination_address: "",
  });
  const [isDialog, setIsDialog] = useState(false);
  const [route, setRoute] = useState(null);
  const [taxi, setTaxi] = useState(null);
  const location = useLocation();
  const [destinationName, setDestinationName] = useState("");

  useEffect(() => {
    if (location.state && location.state.address) {
      const { address_name, road_address, latitude, longitude } =
        location.state.address;
      setValues({
        ...values,
        destination_address: road_address,
      });
      setRoute({
        startX: "126.651415033662",
        startY: "37.4482020408321",
        endX: longitude,
        endY: latitude,
      });
      setDestinationName(address_name);
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
      starting_address: "인천광역시 미추홀구 용현동 292-7",
      destination_address: "",
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
        alert("주소를 다시 확인하세요.");
        return;
      }

      const routeData = await getRoute(
        startCoords.documents[0].x,
        startCoords.documents[0].y,
        destCoords.documents[0].x,
        destCoords.documents[0].y
      );

      const polyline = routeData.routes[0].sections[0].roads.flatMap((road) =>
        road.vertexes.reduce((acc, _, index, array) => {
          if (index % 2 === 0) {
            acc.push({ x: array[index], y: array[index + 1] });
          }
          return acc;
        }, [])
      );

      setRoute({
        startX: startCoords.documents[0].x,
        startY: startCoords.documents[0].y,
        endX: destCoords.documents[0].x,
        endY: destCoords.documents[0].y,
        polyline,
      });

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
          <Typo text="현재 위치에서" fontSize="24px" fontWeight="bold" />
          <Button
            text={destinationName ? destinationName : "selectedaddress"}
            width="auto"
            height="auto"
            backgroundColor="#0d99ff"
            hoverBackgroundColor="#007acc"
          />
          <Typo
            text="까지 가는 택시를 호출 중입니다."
            fontSize="24px"
            fontWeight="bold"
            style={{ margin: "0" }}
          />
          <Input
            label="출발지"
            name="starting_address"
            placeholder="출발지를 입력하세요"
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
          />

          <Button text="경로 찾기" onClick={handleFindRoute} />
          {route && <Map route={route} taxi={taxi} />}
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
