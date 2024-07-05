import React from "react";
import styled from "styled-components";

const Dialog = ({ isDialog, onClose, onConfirm }) => {
  return (
    <StyledDialog data-isopen={isDialog}>
      <DialogContent>
        정말로 취소하시겠습니까?
        <ButtonWrapper>
          <ConfirmBtn onClick={onConfirm}>예</ConfirmBtn>
          <CloseBtn onClick={onClose}>아니오</CloseBtn>
        </ButtonWrapper>
      </DialogContent>
    </StyledDialog>
  );
};

// 'isOpen' 오류 해결
const StyledDialog = styled.div`
  display: ${(props) => (props['data-isopen'] ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const DialogContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const CloseBtn = styled.button`
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ConfirmBtn = styled.button`
  padding: 10px;
  border: none;
  background-color: red;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;

const Modal = ({ isDialog, onClose, onConfirm }) => {
  return (
    <div>
      <Dialog isDialog={isDialog} onClose={onClose} onConfirm={onConfirm} />
    </div>
  );
};

export default Modal;
