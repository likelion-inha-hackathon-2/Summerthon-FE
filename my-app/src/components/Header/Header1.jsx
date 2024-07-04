// src/components/Header/Header1.jsx

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
  background: #0d99ff;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  margin: 0 auto;
  background: #0d99ff;
  border-bottom: 1px solid #dee5ed;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;

  /* 모바일 설정 (iPhone SE) */
  @media (max-width: 320px) {
    width: 320px;
 
  }

  /* 데스크톱 설정 (1440x1024) */
  @media (min-width: 1440px) {
    width: 1440px;
 
  }
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
