import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";

const StyledAddButton = styled.div`
  margin: 10px;
`;

// 수정 가능하도록 ...rest 추가
const AddButton = ({ onClick, text, fontSize = "14px", width = "auto", ...rest }) => {
  return (
    <StyledAddButton>
      <Button text={text} fontSize={fontSize} width={width} onClick={onClick} {...rest} />
    </StyledAddButton>
  );
};

export default AddButton;
