import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import Typo from "../Typo/Typo"; // Typo 컴포넌트 추가
import { getNearbyTaxi } from "../../apis/taxiApi";
import { getAddressToCoordinate, getRoute } from "../../apis/kakaoApi";
import Map from "../Map/Map";

const TaxiContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Taxi = () => {
  const [message, setMessage] = useState("");
  const [route, setRoute] = useState(null);
  const [destination, setDestination] = useState("");
  const [taxi, setTaxi] = useState(null); // 택시 받아오기
  const [duration, setDuration] = useState(null); // 소요 시간

  const handleSearchRoute = async () => {
    try {
      const coords = await getAddressToCoordinate(destination);
      const { x, y } = coords.documents[0].address;

      const routeData = await getRoute(
        126.651415033662,
        37.4482020408321,
        x,
        y
      );

      if (routeData.routes && routeData.routes[0]?.sections[0]?.roads) {
        const polyline = routeData.routes[0].sections[0].roads.flatMap((road) =>
          road.vertexes.reduce((acc, _, index, array) => {
            if (index % 2 === 0) {
              acc.push({ x: array[index], y: array[index + 1] });
            }
            return acc;
          }, [])
        );

        setRoute({
          startX: 126.651415033662,
          startY: 37.4482020408321,
          endX: x,
          endY: y,
          polyline,
        });

        setMessage("경로가 성공적으로 생성되었습니다.");

        // 가장 가까운 택시 호출
        const nearbyTaxi = await getNearbyTaxi({
          destination_address: destination,
        });
        if (nearbyTaxi.taxi && nearbyTaxi.taxi.length > 0) {
          const nearestTaxi = nearbyTaxi.taxi[0];
          setTaxi(nearestTaxi);
          setDuration(Math.ceil(nearbyTaxi.duration / 60)); // 소요 시간을 분 단위로 변환하여 설정
          setMessage(
            `가장 가까운 택시가 호출되었습니다. 소요 시간: ${Math.ceil(
              nearbyTaxi.duration / 60
            )} 분`
          );
          console.log("Called Nearby Taxi:", nearestTaxi);
        } else {
          setMessage("가까운 택시를 찾지 못했습니다.");
        }
      } else {
        console.error("Invalid route data structure", routeData);
        alert("경로를 찾을 수 없습니다.");
      }
    } catch (error) {
      setMessage("경로 생성에 실패했습니다.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <TaxiContainer>
        {message && <p>{message}</p>}
        {taxi && (
          <div>
            <Typo text={`택시 번호: ${taxi.license_number}`} />
            <Typo text={`기사님 이름: ${taxi.driver_name}`} />
            <Typo text={`기사님 전화번호: ${taxi.driver_phone}`} />
            <Typo text={`예상 소요 시간: ${duration} 분`} />
          </div>
        )}
      </TaxiContainer>
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="도착지 주소 입력"
      />
      <Button text="택시 호출하기" onClick={handleSearchRoute} />
      {route && <Map route={route} taxi={taxi} />}
    </div>
  );
};

export default Taxi;
