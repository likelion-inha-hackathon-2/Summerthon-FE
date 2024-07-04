import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import { createTaxi, getNearbyTaxi } from "../../apis/taxiApi";
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
  const [taxi, setTaxi] = useState(null);

  // 택시 생성
  const handleCreateTaxi = async () => {
    const taxiData = {
      license_number: "123-456",
      latitude: (37.4482020408321).toFixed(6).toString(), // 소수점 이하 6자리로 제한하고 문자열로 변환
      longitude: (126.651415033662).toFixed(6).toString(), // 소수점 이하 6자리로 제한하고 문자열로 변환
      driver_name: "김기사",
      driver_phone: "010-1234-5678",
      acceptance: 1,
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

  // 경로 찾기 (모빌리티)
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
        const nearbyTaxi = await getNearbyTaxi();
        if (nearbyTaxi) {
          setTaxi(nearbyTaxi);
          setMessage(`가장 가까운 택시가 호출되었습니다.`);
          console.log("Called Nearby Taxi:", nearbyTaxi);
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
      <TaxiContainer>{message && <p>{message}</p>}</TaxiContainer>
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
