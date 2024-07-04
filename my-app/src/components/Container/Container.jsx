import React from "react";
import styled from "styled-components";

const Container = (props) => {
  return (
    <ContainerWrapper>
      {props.children} {/* 컨테이너 안에서 자식 컴포넌트를 렌더링 */}
    </ContainerWrapper>
  );
};

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 3px solid #e6e6e6;
  border-radius: 10px;
  width: 320px; /* iPhone SE */
  height: 568px; /* iPhone SE */
  max-width: 100%;
  padding: 0 20px;
  margin: 0 auto;

  @media (max-width: 320px) {
    width: 100%;
    height: auto;
  }
`;

export default Container;
