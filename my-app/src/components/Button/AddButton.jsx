import React from "react";
import Button from "../Button/Button";

const AddButton = ({ onClick }) => {
  return (
    <Button text="추가 등록" fontSize="14px" width="100px" onClick={onClick} />
  );
};

export default AddButton;
