import React from "react";
import Button from "../Button/Button";

// 버튼 이름 변경할 수 있도록 text props 추가
const AddButton = ({ onClick, text }) => {
  return <Button text={text} fontSize="14px" width="120px" onClick={onClick} />;
};

export default AddButton;
