import React from "react";
import Container from "../components/Container/Container";
import Flex from "../components/Flex/Flex";
import Image from "../components/Image/Image";
import Typo from "../components/Typo/Typo";
import Button from "../components/Button/Button";
import { ImageTaxi } from "../assets/image";

const Home = () => {
  return (
    <Container>
      <Flex direction="column" justify="center" align="center">
        <Image src={ImageTaxi} width={"309px"} height={"228px"} />
        <Typo text="택시 서비스" fontSize="28px" fontWeight="bold"/>
        <Typo text="아래 버튼을 눌러 시작하세요!" fontSize="18px" color="gray" />
        <Button text="시작하기" fontSize="20px" />
      </Flex>
    </Container>
  );
};

export default Home;
