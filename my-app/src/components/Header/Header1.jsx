import React from "react";
import styled from "styled-components";
import Image from "../Image/Image";
import IconArrow from "../../assets/icons/arrow.png";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

const Container = styled.div`
  display: flex;
  width: 473px;
  height: 64px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee5ed;
  margin: 0 auto;
  background: #0d99ff;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  cursor: pointer;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
  cursor: pointer;
  color: #ffffff; 
  font-size: 20px;
`;

const Header1 = () => {
  const navigate = useNavigate();

  const goToBackPage = () => {
    navigate(-1);
  };

  const goToMyInfoPage = () => {
    navigate("/me");
  };

  return (
    <Wrapper>
      <Container>
        <IconContainer onClick={goToBackPage}>
          <Image src={IconArrow} />
        </IconContainer>
        <TextContainer onClick={goToMyInfoPage}>내 정보</TextContainer>
      </Container>
    </Wrapper>
  );
};

export default Header1;
