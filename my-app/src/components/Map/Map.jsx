import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledMap = styled.div`
  width: 300px;
  height: 300px;
`;

const Map = ({ address }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loadScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src =
          `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Script load error"));
        document.head.appendChild(script);
      });
    };

    const initMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const newMap = new window.kakao.maps.Map(container, options);
        setMap(newMap);
      });
    };

    loadScript()
      .then(() => {
        window.kakao.maps.load(initMap);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (map && address) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          map.setCenter(coords);

          new window.kakao.maps.Marker({
            map: map,
            position: coords,
          });
        }
      });
    }
  }, [map, address]);

  return (
    <StyledMap>
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </StyledMap>
  );
};

export default Map;
