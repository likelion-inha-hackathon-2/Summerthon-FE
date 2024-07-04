import React, { useState } from "react";
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
  const [loading, setLoading] = useState(false);

  const handleCancel = () => setIsDialog(true);
  const handleClose = () => setIsDialog(false);
  const handleConfirm = () => setIsDialog(false);

  const handleSendEmail = async () => {
    setLoading(true);
    try {
      const response = await sendEmail();
      alert(response.message || "이메일 전송이 실패하였습니다.");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("이메일 전송 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header1 />
      <Flex
        direction="column"
        align="center"
        paddingTop="150px"
        paddingLeft="10px"
        paddingRight="10px"
      >
        <Typo
          text="현재 위치를 보호자에게 전송합니다"
          fontSize="20px"
          fontWeight="bold"
          style={{ marginBottom: "20px" }}
        />
        <Input
          label="현위치"
          name="starting_address"
          placeholder="현 위치"
          value="인천광역시 미추홀구 용현동 292-7"
          readOnly
          style={{ marginBottom: "20px" }}
        />
        <Button
          text="보호자 호출하기(email)"
          onClick={handleSendEmail}
          disabled={loading}
          fontSize="20px"
          style={{ marginBottom: "20px" }}
        />
        <Map />
        <CancleButton onClick={handleCancel} />
      </Flex>
      <Modal
        isDialog={isDialog}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default EmerCall;
