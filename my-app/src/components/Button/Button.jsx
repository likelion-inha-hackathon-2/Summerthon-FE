// ../components/Button/Button

import React from "react";
import styled from "styled-components";

const Button = ({
  text,
  backgroundColor,
  hoverBackgroundColor,
  color,
  fontSize,
  width,
  height,
  ...rest
}) => {
  return (
    <StyledButton
      fontSize={fontSize}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      hoverBackgroundColor={hoverBackgroundColor}
      color={color}
      {...rest}
    >
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  font-size: ${(props) => props.fontSize || "24px"};
  width: ${(props) => props.width || "360px"};
  height: ${(props) => props.height || "54px"};
  background-color: ${(props) => props.backgroundColor || "#0d99ff;"};
  color: ${(props) => props.color || "white"};
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.hoverBackgroundColor || "#0056b3"};
  }
`;

export default Button;
