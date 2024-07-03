import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const StyledMap = styled.div`
  width: 100%;
  height: 300px;
`;

const Map = ({ route }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY}&libraries=services,clusterer,drawing&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapOptions = {
          center: new window.kakao.maps.LatLng(
            37.4482020408321,
            126.651415033662
          ), // 인하대 좌표
          level: 5,
        };

        const map = new window.kakao.maps.Map(mapContainer.current, mapOptions);

        if (route && route.polyline) {
          const { startX, startY, endX, endY, polyline } = route;

          // 출발지 표시하는 마커
          const startMarker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(startY, startX),
            map: map,
          });

          // 도착지 표시하는 마커
          const endMarker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(endY, endX),
            map: map,
          });

          // 경로 나타내기
          const linePath = polyline.map(
            (point) => new window.kakao.maps.LatLng(point.y, point.x)
          );

          const polylinePath = new window.kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 5,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeStyle: "solid",
          });

          polylinePath.setMap(map);

          const bounds = new window.kakao.maps.LatLngBounds();
          bounds.extend(new window.kakao.maps.LatLng(startY, startX));
          bounds.extend(new window.kakao.maps.LatLng(endY, endX));
          map.setBounds(bounds);
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [route]);

  return <StyledMap ref={mapContainer}></StyledMap>;
};

export default Map;
