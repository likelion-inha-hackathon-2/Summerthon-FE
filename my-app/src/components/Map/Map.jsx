import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const StyledMap = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 10px;
`;

const Map = ({ route, taxi }) => {
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

        // 가장 가까운 택시 마커
        // 차라리 맵이랑 택시를 합쳐서 만들어야 하나..
        if (taxi) {
          const taxiMarker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(
              taxi.latitude,
              taxi.longitude
            ),
            map: map,
            // 마커 이미지 불러오기
            image: new window.kakao.maps.MarkerImage(
              "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커 이미지 URL
              new window.kakao.maps.Size(24, 35)
            ),
          });
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [route, taxi]);

  return <StyledMap ref={mapContainer}></StyledMap>;
};

export default Map;
