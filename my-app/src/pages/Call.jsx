import React, { useState } from "react";
import Container from "../components/Container/Container";
import Flex from "../components/Flex/Flex";
import Typo from "../components/Typo/Typo";
import Input from "../components/Input/Input";
import CancleButton from "../components/Button/CancleButton";
import useForm from "../hooks/useForm";
import Modal from "../components/Modal/Modal";
import Map from "../components/Map/Map";

const Call = () => {
  const { values, handleChange } = useForm({
    starting_address: "",
    destination__address: "",
  });
  const [isDialog, setIsDialog] = useState(false);

  const handleCancel = () => {
    setIsDialog(true);
  };

  const handleClose = () => {
    setIsDialog(false);
  };

  const handleConfirm = () => {
    setIsDialog(false);
    // 취소 팝업에서 예를 누르면 처음 메인으로 돌아가도록 해야함!
  };

  return (
    <div>
      <Container>
        <Flex>
          <Typo
            text="어디로 택시를 호출할까요?"
            fontSize="28px"
            fontWeight="bold"
          />
          <Input
            label="출발지"
            name="starting_address"
            placeholder="출발지를 입력하세요"
            value={values.starting_address}
            onChange={handleChange}
          />
          <Input
            label="도착지"
            name="destination__address"
            placeholder="도착지를 입력하세요"
            value={values.destination__address}
            onChange={handleChange}
          />
          <Map address={values.starting_address} />
          <CancleButton onClick={handleCancel} />
        </Flex>
      </Container>
      <Modal
        isDialog={isDialog}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default Call;
