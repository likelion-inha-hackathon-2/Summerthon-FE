import React from "react";
import styled from "styled-components";

const StyledFlex = styled.div`
  display: flex;
  justify-content: ${(props) => props.justify || "center"};
  align-items: ${(props) => props.align || "center"};
  flex-direction: ${(props) => props.direction || "column"};
  padding-top: ${(props) => props.paddingTop || "0"};
`;

const Flex = ({
  direction,
  justify,
  align,
  paddingTop,
  mobilePaddingTop,
  tabletPaddingTop,
  desktopPaddingTop,
  ...props
}) => {
  return (
    <StyledFlex
      direction={direction}
      justify={justify}
      align={align}
      paddingTop={paddingTop}
      mobilePaddingTop={mobilePaddingTop}
      tabletPaddingTop={tabletPaddingTop}
      desktopPaddingTop={desktopPaddingTop}
      {...props}
    />
  );
};

export default Flex;
