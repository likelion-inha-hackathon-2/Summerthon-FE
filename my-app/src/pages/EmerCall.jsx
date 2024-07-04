import React, { useState } from "react";
import Container from "../components/Container/Container";
import Flex from "../components/Flex/Flex";
import Input from "../components/Input/Input";
import CancleButton from "../components/Button/CancleButton";
import Modal from "../components/Modal/Modal";
import Map from "../components/Map/Map";
import Button from "../components/Button/Button";
import Typo from "../components/Typo/Typo";
import Header1 from "../components/Header/Header1";
import { sendEmail } from "../apis/emailApi";

const EmerCall = () => {
  const [isDialog, setIsDialog] = useState(false);

  const handleCancel = () => {
    setIsDialog(true);
  };

  const handleClose = () => {
    setIsDialog(false);
  };

  const handleConfirm = () => {
    setIsDialog(false);
  };

  const handleSendEmail = async () => {
    try {
      const response = await sendEmail();
      // 성공 로직 간단하게 처리 200
      if (response.status === "200") {
        alert(response.message);
      } else if (response.status === "401") {
        alert(response.message);
        // 로그인이 필요한 경우 로그인 페이지로 리디렉션하는 로직을 추가할 수 있습니다.
      } else {
        alert("이메일 전송이 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("이메일 전송 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <Container>
        <Header1 />
        <Flex direction="column" align="center">
          <Typo
            text="현재 위치를 보호자에게 전송합니다"
            fontSize="24px"
            fontWeight="bold"
          />
          <Input
            label="현위치"
            name="starting_address"
            placeholder="현 위치"
            value="인천광역시 미추홀구 용현동 292-7"
            readOnly
          />
          <Button text="보호자 호출하기(email)" onClick={handleSendEmail} />
          <Map />
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

export default EmerCall;
