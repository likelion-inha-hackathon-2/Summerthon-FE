import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "../components/Container/Container";
import Flex from "../components/Flex/Flex";
import Typo from "../components/Typo/Typo";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";

const SignUpSecond = () => {
  const location = useLocation();
  const firstPageValues = location.state || {};

  const {
    values: formValues,
    handleChange,
    setValue,
  } = useForm({
    protector: "",
    protector_name: "",
    address_name: "",
    address: "",
    addrDetail: "",
  });

  const [roadAddress, setRoadAddress] = useState("");

  const handleAddressChange = (data) => {
    setRoadAddress(data.roadAddress);
    setValue("address", data.roadAddress);
  };

  const handleAddressNameChange = (event) => {
    const { value } = event.target;
    setValue("address_name", value);
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    const finalData = {
      ...firstPageValues,
      ...formValues,
      address: `${roadAddress} ${formValues.addrDetail}`,
    };
    console.log("Final signup data:", finalData);
    alert("회원가입 완료");
    // 로그인 페이지 /login로 이동
    navigate("/login");
  };

  const openAddressPopup = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        handleAddressChange(data);
      },
    }).open();
  };

  return (
    <Container>
      <Flex direction="column" align="left">
        <Typo text="회원가입 2" fontSize="24px" fontWeight="bold" />
        <Typo text="보호자 등록" fontSize="20px" />
        <Input
          label="보호자 연락처"
          name="protector"
          placeholder="보호자 연락처를 입력하세요"
          value={formValues.protector}
          onChange={handleChange}
        />
        <Input
          label="보호자 저장 이름"
          name="protector_name"
          placeholder="보호자 저장 이름을 입력하세요"
          value={formValues.protector_name}
          onChange={handleChange}
        />
        <Typo text="주소지 등록" fontSize="20px" />

        <Input
          label="주소지 이름"
          name="address_name"
          placeholder="등록할 주소지 이름을 입력하세요"
          value={formValues.address_name}
          onChange={handleAddressNameChange}
        />
        <Flex direction="row" align="left">
          <Typo text="도로명 주소" fontSize="16px" />
          <Input
            type="text"
            value={roadAddress}
            placeholder="도로명 주소를 검색하세요."
            readOnly
          />
          <Button
            text="검색"
            fontSize="14px"
            width="60px"
            onClick={openAddressPopup}
          />
        </Flex>
        <Input
          label="상세주소"
          name="addrDetail"
          placeholder="상세주소를 입력하세요"
          value={formValues.addrDetail}
          onChange={handleChange}
        />
        <Button
          text="회원가입 완료하기"
          fontSize="20px"
          onClick={handleSubmit}
          disabled={!roadAddress || !formValues.addrDetail}
        />
      </Flex>
    </Container>
  );
};

export default SignUpSecond;
