// ../components/Flex/Flex

import React from "react";
import styled from "styled-components";

const StyledFlex = styled.div`
  display: flex;
  justify-content: ${(props) => props.justify || "center"};
  align-items: ${(props) => props.align || "center"};
  flex-direction: ${(props) => props.direction || "column"};
`;

const Flex = ({ direction, justify, align, ...props }) => {
  return (
    <StyledFlex
      direction={direction}
      justify={justify}
      align={align}
      {...props/* Flex 속성을 간편하게 적용하기 위한 컴포넌트입니다. */}
    />
  );
};

export default Flex;
