import React from "react";
import styled from "styled-components";
import Input from "../Input/Input";

// 보호자 추가 등록 모달
const InfoForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
  max-width: 400px;
  text-align: left;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ConfirmBtn = styled.button`
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

const CancelBtn = styled.button`
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

const AddProtectorModal = ({
  isModalOpen,
  onClose,
  onConfirm,
  newPageData,
  handleInputChange,
  errorMessage,
}) => {
  if (!isModalOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <InfoForm>
          <Input
            label="보호자 이름"
            id="protector_name"
            name="protector_name"
            value={newPageData.protector_name || ""}
            onChange={handleInputChange}
          />
          <Input
            label="보호자 이메일"
            id="protector_email"
            name="protector_email"
            value={newPageData.protector_email || ""}
            onChange={handleInputChange}
          />
          {errorMessage && <div>{errorMessage}</div>}
        </InfoForm>
        <ButtonWrapper>
          <ConfirmBtn onClick={onConfirm}>확인</ConfirmBtn>
          <CancelBtn onClick={onClose}>취소</CancelBtn>
        </ButtonWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddProtectorModal;
