import React from "react";
import Flex from "../components/Flex/Flex";
import Image from "../components/Image/Image";
import Typo from "../components/Typo/Typo";
import Button from "../components/Button/Button";
import { ImageLogo } from "../assets/image";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate("/login");
  };

  return (
    <Flex direction="column" justify="center" align="center">
      <Image src={ImageLogo} width={"309px"} height={"auto"} />

      <Typo text="당신을 위한 택시 서비스" fontSize="20px" fontWeight="bold" />
      <Button text="바로 시작하세요!" fontSize="20px" onClick={goToLoginPage} />
    </Flex>
  );
};

export default Home;
