import React, { useState, useEffect, useCallback } from "react";
import Container from "../components/Container/Container";
import Flex from "../components/Flex/Flex";
import Input from "../components/Input/Input";
import CancleButton from "../components/Button/CancleButton";
import Modal from "../components/Modal/Modal";
import Map from "../components/Map/Map";
import Button from "../components/Button/Button";
import Typo from "../components/Typo/Typo";
import Header1 from "../components/Header/Header1";
import {  getRoute } from "../apis/kakaoApi";
import { getNearbyTaxi } from "../apis/taxiApi";
import { useLocation } from "react-router-dom";

const Scan = () => {
  const [values, setValues] = useState({
    starting_address: "인천광역시 미추홀구 용현동 292-7",
    destination_address: "",
  });
  const [isDialog, setIsDialog] = useState(false);
  const [route, setRoute] = useState(null);
  const [taxi, setTaxi] = useState(null);
  const location = useLocation();
  const [duration, setDuration] = useState(null);
  const [destinationName, setDestinationName] = useState("");

  const findRoute = useCallback(
    async (endX, endY) => {
      const startX = "126.651415033662";
      const startY = "37.4482020408321";
      try {
        const routeData = await getRoute(startX, startY, endX, endY);

        if (
          routeData.routes &&
          routeData.routes[0] &&
          routeData.routes[0].sections &&
          routeData.routes[0].sections[0] &&
          routeData.routes[0].sections[0].roads
        ) {
          const polyline = routeData.routes[0].sections[0].roads.flatMap(
            (road) =>
              road.vertexes.reduce((acc, _, index, array) => {
                if (index % 2 === 0) {
                  acc.push({ x: array[index], y: array[index + 1] });
                }
                return acc;
              }, [])
          );

          setRoute({
            startX,
            startY,
            endX,
            endY,
            polyline,
          });

          const nearbyTaxi = await getNearbyTaxi({
            destination_address: values.starting_address,
          });
          if (nearbyTaxi.taxi && nearbyTaxi.taxi.length > 0) {
            const nearestTaxi = nearbyTaxi.taxi[0];
            setTaxi(nearestTaxi);
            setDuration(Math.ceil(nearbyTaxi.duration / 60)); // 소요 시간을 분 단위로 변환하여 설정
            console.log("Called Nearby Taxi:", nearestTaxi);
          } else {
            console.error("No nearby taxi found", nearbyTaxi);
            alert("가까운 택시를 찾지 못했습니다.");
          }
        } else {
          console.error("Invalid route data structure", routeData);
          alert("경로를 찾을 수 없습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("Error finding route:", error);
        alert("경로를 찾는 도중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
    [values.starting_address]
  );

  useEffect(() => {
    if (location.state && location.state.address) {
      const { road_address, latitude, longitude, address_name } =
        location.state.address;
      setValues((prevValues) => ({
        ...prevValues,
        destination_address: road_address,
      }));
      setDestinationName(address_name);
      findRoute(longitude, latitude);
    }
  }, [location.state, findRoute]);

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

  return (
    <Container>
      <Header1 />
      <Flex direction="column" align="center">
        <Typo text="현재 위치에서" fontSize="24px" fontWeight="bold" />
        <Button
          text={destinationName ? destinationName : "selected address"}
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
          onChange={() => {}}
          readOnly
        />
        <Input
          label="도착지"
          name="destination_address"
          placeholder="도착지를 입력하세요"
          value={values.destination_address}
          onChange={() => {}}
          readOnly
        />
        {route && <Map route={route} taxi={taxi} />}
        {!route && <Map />} {/* 도착지 입력 전 인하대 고정 지도 표시 */}
        {taxi && (
          <Flex direction="column" align="center">
            <Typo text={`택시 번호: ${taxi.license_number}`} />
            <Typo text={`기사님 이름: ${taxi.driver_name}`} />
            <Typo text={`기사님 전화번호: ${taxi.driver_phone}`} />
            <Typo text={`예상 소요 시간: ${duration} 분`} />
          </Flex>
        )}
        <CancleButton onClick={handleCancel} />
      </Flex>
      <Modal
        isDialog={isDialog}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </Container>
  );
};

export default Scan;
