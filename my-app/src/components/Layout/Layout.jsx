import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom"; // 중첩 라우터 설정

const Layout = () => {
  return (
    <LayoutWrapper>
      <ContainerWrapper>
        <Outlet /> {/* 자식 컴포넌트를 렌더링 */}
      </ContainerWrapper>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 부모 요소의 높이를 100%로 설정 */
  width: 100vw; /* 부모 요소의 너비를 100%로 설정 */

  /* 데스크톱 설정 */
  @media (min-width: 768px) {
  }
`;

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;

  border-radius: 10px;
  width: 320px;
  height: 568px;
  max-width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  /* 모바일 설정 */
  @media (max-width: 767px) {
    width: 100%;
    height: auto;
    padding-top: 100px;
    padding-bottom: 100px;
  }

  /* 데스크톱 설정 */
  @media (min-width: 768px) {
    width: 90%; // 너비 설정
    height: auto;
  }
`;

export default Layout;
