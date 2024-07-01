import React from "react";
import Container from "../components/Container/Container";
import Flex from "../components/Flex/Flex";
import Image from "../components/Image/Image";
import Typo from "../components/Typo/Typo";
import { ButtonCall, ButtonEmer, ButtonScan } from "../assets/image";

const Main = () => {
  const Alert = () => {
    alert("클릭 테스트");
    // 각 호출 페이지로 navigate되도록 수정 필요
  };


  return (
    <Container>
      <Flex>
        <Flex align="flex-start">
          <Typo
            text="안녕하세요!"
            fontSize="28px"
            fontWeight="bold"
            style={{ margin: "0" }}
          />
          <Typo
            text="무엇을 도와드릴까요?"
            fontSize="28px"
            fontWeight="bold"
            style={{ marginTop: "20px" }}
          />
        </Flex>
        <Typo
          text="택시 호출하기"
          fontSize="20px"
          fontWeight="bold"
          color="#0D99FF"
        />
        <Typo
          // 호출 예상 시간으로 수정 필요
          text="지금 호출하면 평균 12분 내에 택시가 도착해요!"
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
          <Image src={ButtonCall} onClick={Alert} />
          <Image src={ButtonScan} onClick={Alert} />
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
        <Image src={ButtonEmer} onClick={Alert} style={{ marginTop: "20px" }} />
      </Flex>
    </Container>
  );
};

export default Main;
