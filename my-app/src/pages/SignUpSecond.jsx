import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../components/Container/Container";
import Flex from "../components/Flex/Flex";
import Typo from "../components/Typo/Typo";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import useForm from "../hooks/useForm";
import authApi from "../apis/authApi";

const SignUpSecond = () => {
  const location = useLocation();
  const firstPageValues = location.state || {};

  console.log("Received values from first page:", firstPageValues);

  const {
    values: formValues,
    handleChange,
    setValue,
  } = useForm({
    protector_phone: "",
    protector_email: "",
    address_name: "",
    address: "",
    addrDetail: "",
  });

  const [roadAddress, setRoadAddress] = useState("");
  const [error, setError] = useState("");

  const handleAddressChange = (data) => {
    setRoadAddress(data.roadAddress);
    setValue("address", data.roadAddress);
  };

  const handleAddressNameChange = (event) => {
    const { value } = event.target;
    setValue("address_name", value);
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const finalData = {
      user: {
        user_login_id: firstPageValues.user_login_id,
        password: firstPageValues.password,
        user_name: firstPageValues.user_name,
        user_gender: firstPageValues.user_gender,
        user_phone: firstPageValues.user_phone,
        user_age: parseInt(firstPageValues.user_age, 10),
      },
      protector: {
        protector_email: formValues.protector_email,
        protector_name: formValues.protector_name,
      },
      address: {
        address_name: formValues.address_name,
        road_address: roadAddress,
        detail_address: formValues.addrDetail,
      },
    };

    console.log("Final data to be sent to the server:", finalData);

    try {
      const response = await authApi.post("/signup", finalData);
      if (response.status === 200 || response.status === 201) {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (error) {
      if (error.response) {
        const responseData = error.response.data;
        if (responseData.message && responseData.message.user) {
          setError("회원가입에 실패했습니다.");
        } else {
          setError("회원가입에 실패했습니다.");
        }
      } else {
        setError("서버와의 통신에 실패했습니다. 네트워크 연결을 확인해주세요.");
      }
    }
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
          label="보호자 저장 이름"
          name="protector_name"
          placeholder="보호자 저장 이름을 입력하세요"
          value={formValues.protector_name}
          onChange={handleChange}
        />
        <Input
          label="보호자 연락처"
          name="protector_email"
          placeholder="보호자 연락처를 입력하세요"
          value={formValues.protector_email}
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
        {error && <p style={{ color: "red" }}>{error}</p>}
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
