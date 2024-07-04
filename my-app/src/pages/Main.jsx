import React from "react";
import Flex from "../components/Flex/Flex";
import Image from "../components/Image/Image";
import Typo from "../components/Typo/Typo";
import { ButtonCall, ButtonEmer, ButtonScan } from "../assets/image";
import { useNavigate } from "react-router-dom";
import Header1 from "../components/Header/Header1";

const Main = () => {
  const navigate = useNavigate();

  // 일반 호출
  const goToCallPage = () => {
    navigate("/call");
  };

  // QR 스캔 호출
  const goToArriveLocation = () => {
    navigate("/arrive-location");
  };

  // 긴급 호출
  const goToEmerCallPage = () => {
    navigate("/emercall");
  };

  return (
    <>
      <Header1 />
      <Flex>
        <Flex align="flex-start" style={{ paddingTop: "100px" }}>
          <Typo
            text="안녕하세요!"
            fontSize="28px"
            fontWeight="bold"
            style={{ marginBottom: "0px" }}
          />
          <Typo text="무엇을 도와드릴까요?" fontSize="28px" fontWeight="bold" />
        </Flex>
        <Typo
          text="택시 호출하기"
          fontSize="20px"
          fontWeight="bold"
          color="#0D99FF"
        />
        <Typo
          text="택시 호출 방법을 선택해주세요!"
          fontSize="14px"
          color="gray"
          style={{ margin: "0" }}
        />
        <Flex
          direction="row"
          justify="space-between"
          align="center"
          style={{ margin: "20px" }}
        >
          <Image src={ButtonCall} onClick={goToCallPage} />
          <Image src={ButtonScan} onClick={goToArriveLocation} />
        </Flex>
        <Typo
          text="긴급 호출하기"
          fontSize="20px"
          fontWeight="bold"
          color="#FF0000"
        />
        <Typo
          text="현재 위치 정보가 보호자에게 전송됩니다."
          fontSize="14px"
          color="gray"
          style={{ margin: "0" }}
        />
        <Image
          src={ButtonEmer}
          onClick={goToEmerCallPage}
          style={{ marginTop: "20px" }}
        />
      </Flex>
    </>
  );
};

export default Main;
