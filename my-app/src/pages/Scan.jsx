import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Flex from "../components/Flex/Flex";
import CancleButton from "../components/Button/CancleButton";
import Modal from "../components/Modal/Modal";
import Map from "../components/Map/Map";
import Button from "../components/Button/Button";
import Typo from "../components/Typo/Typo";
import Header1 from "../components/Header/Header1";
import Input from "../components/Input/Input";
import { getRoute } from "../apis/kakaoApi";
import { getNearbyTaxi } from "../apis/taxiApi";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  @media (max-width: 600px) {
    padding: 10px;
  }
`;

// 아이폰 SE 반응형 추가
const ContentWrapper = styled.div`
  padding-top: 200px;
  @media (max-width: 600px) {
    margin-top: 280px;
  }
  @media (max-width: 320px) {
    padding-top: 100px;
  }
`;

const TaxiInfoContainer = styled.div`
  background-color: #f0f8ff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TaxiInfo = ({ taxi, duration, fair }) => (
  <TaxiInfoContainer>
    <Typo text={`택시 번호: ${taxi.license_number}`} />
    <Typo text={`기사님 이름: ${taxi.driver_name}`} />
    <Typo text={`기사님 전화번호: ${taxi.driver_phone}`} />
    <Typo text={`예상 소요 시간: ${duration} 분`} />
    <Typo text={`예상 요금: ${fair} 원`} />
  </TaxiInfoContainer>
);

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
  const [fair, setFair] = useState(null);
  const [destinationName, setDestinationName] = useState("");

  const findRoute = useCallback(
    async (endX, endY) => {
      const startX = "126.651415033662";
      const startY = "37.4482020408321";
      try {
        const routeData = await getRoute(startX, startY, endX, endY);

        if (routeData.routes && routeData.routes[0]?.sections[0]?.roads) {
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
            setDuration(Math.ceil(nearbyTaxi.duration / 60));
            setFair(nearbyTaxi.fair);
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
    <>
      <Header1 />
      <Container>
        <ContentWrapper>
          <Flex direction="column" align="center">
            <Typo
              text={`${
                destinationName ? destinationName : "selected address"
              } 까지 가는 택시를 호출합니다.`}
              fontSize="20px"
              fontWeight="bold"
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
            {taxi && <TaxiInfo taxi={taxi} duration={duration} fair={fair} />}
            <Flex
              direction="column"
              align="center"
              style={{ marginTop: "20px" }}
            >
              <CancleButton onClick={handleCancel} />
            </Flex>
          </Flex>
        </ContentWrapper>
        <Modal
          isDialog={isDialog}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      </Container>
    </>
  );
};

export default Scan;
