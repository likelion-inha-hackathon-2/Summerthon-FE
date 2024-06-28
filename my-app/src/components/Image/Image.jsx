// ../components/Image/Image
import React from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const Image = ({ src, width, height, ...rest }) => {
  return <StyledImage src={src} width={width} height={height} {...rest} />;
};

export default Image;
