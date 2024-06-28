// ../components/Typo/Typo.js

import React from "react";
import styled from "styled-components";

const StyledTypo = styled.p`
  color: ${(props) => props.color || "black"};
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: ${(props) => props.fontWeight || "normal"}; 
  text-align: ${(props) => (props.center ? "center" : "left")};
`;

const Typo = ({ text, ...rest }) => {
  return <StyledTypo {...rest}>{text}</StyledTypo>;
};

export default Typo;
