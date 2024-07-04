import React from "react";
import styled from "styled-components";
import Input from "../Input/Input";

// 주소지 추가 등록 모달
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

const AddInfoModal = ({
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
            label="주소지 이름"
            id="address_name"
            name="address_name"
            value={newPageData.address_name || ""}
            onChange={handleInputChange}
          />
          <Input
            label="도로명 주소"
            id="road_address"
            name="road_address"
            value={newPageData.road_address || ""}
            onChange={handleInputChange}
          />
          <Input
            label="상세 주소"
            id="detail_address"
            name="detail_address"
            value={newPageData.detail_address || ""}
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

export default AddInfoModal;
