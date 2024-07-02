// ../components/Image/Image
import React from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  cursor: pointer;
  transition: filter 0.5s ease; 

  &:hover {
    filter: brightness(0.8); 
  }
`;

const Image = ({ src, width, height, ...rest }) => {
  return <StyledImage src={src} width={width} height={height} {...rest} />;
};

export default Image;
