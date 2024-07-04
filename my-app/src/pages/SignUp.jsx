import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Flex from "../components/Flex/Flex";
import Typo from "../components/Typo/Typo";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import Radio from "../components/Radio/Radio";
import useForm from "../hooks/useForm";
import authApi from "../apis/authApi";
import Header2 from "../components/Header/Header2";

const SignUp = () => {
  const navigate = useNavigate();
  const { values, handleChange, setValue } = useForm({
    user_login_id: "",
    password: "",
    user_name: "",
    user_gender: "",
    user_phone: "",
    user_age: "1",
    protector_name: "",
    protector_email: "",
    address_name: "",
    road_address: "",
    detail_address: "",
  });

  const [error, setError] = useState("");

  const genders = [
    { value: "M", label: "남자" },
    { value: "F", label: "여자" },
  ];

  const ages = Array.from({ length: 100 }, (_, k) => ({
    value: String(k + 1),
    label: String(k + 1),
  }));

  const handleSubmit = async () => {
    const finalData = {
      user: {
        user_login_id: values.user_login_id,
        password: values.password,
        user_name: values.user_name,
        user_gender: values.user_gender,
        user_phone: values.user_phone,
        user_age: parseInt(values.user_age, 10),
      },
      protector: {
        protector_name: values.protector_name,
        protector_email: values.protector_email,
      },
      address: {
        address_name: values.address_name,
        road_address: values.road_address,
        detail_address: values.detail_address,
      },
    };

    console.log("Final User data log test:", finalData);

    try {
      const response = await authApi.post("/signup", finalData);
      if (response.status === 200 || response.status === 201) {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { errors } = error.response.data;
        setError(errors || { general: "회원가입에 실패했습니다." });
      } else {
        setError({
          general:
            "서버와의 통신에 실패했습니다. 네트워크 연결을 확인해주세요.",
        });
      }
    }
  };

  const handleAddressChange = (data) => {
    setValue("road_address", data.roadAddress);
  };

  const openAddressPopup = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        handleAddressChange(data);
      },
    }).open();
  };

  return (
    <>
      <Header2 />
      <Flex direction="column" align="left" style={{ paddingTop: '70px' }}>
        <Typo text="회원가입" fontSize="24px" fontWeight="bold" />
        <Typo text="회원 정보" fontSize="20px" />
        <Input
          label="아이디"
          name="user_login_id"
          placeholder="아이디를 입력하세요"
          value={values.user_login_id}
          onChange={handleChange}
        />
        <Input
          type="password"
          label="비밀번호"
          name="password"
          placeholder="비밀번호를 입력하세요"
          value={values.password}
          onChange={handleChange}
        />
        <Input
          label="이름"
          name="user_name"
          placeholder="이름을 입력하세요"
          value={values.user_name}
          onChange={handleChange}
        />
        <Radio
          label="성별"
          name="user_gender"
          options={genders}
          value={values.user_gender}
          onChange={handleChange}
        />
        <Input
          label="연락처"
          name="user_phone"
          placeholder="ex) 010-1234-5678"
          value={values.user_phone}
          onChange={handleChange}
        />
        <Input
          type="select"
          label="나이"
          name="user_age"
          value={values.user_age}
          onChange={handleChange}
          options={ages}
        />
        <Typo text="보호자 정보" fontSize="20px" />
        <Input
          label="보호자 이름"
          name="protector_name"
          placeholder="보호자 이름을 입력하세요"
          value={values.protector_name}
          onChange={handleChange}
        />
        <Input
          label="보호자 이메일"
          name="protector_email"
          placeholder="보호자 이메일을 입력하세요"
          value={values.protector_email}
          onChange={handleChange}
        />
        <Typo text="주소지 등록" fontSize="20px" />
        <Input
          label="주소지 이름"
          name="address_name"
          placeholder="등록할 주소지 이름을 입력하세요"
          value={values.address_name}
          onChange={handleChange}
        />
        <Flex direction="row" align="left">
          <Typo text="도로명 주소" fontSize="16px" />
          <Input
            type="text"
            name="road_address"
            value={values.road_address}
            placeholder="도로명 주소를 검색하세요."
            readOnly
          />
          <Button
            text="검색"
            fontSize="14px"
            padding="10px"
            onClick={openAddressPopup}
          />
        </Flex>
        <Input
          label="상세주소"
          name="detail_address"
          placeholder="상세주소를 입력하세요"
          value={values.detail_address}
          onChange={handleChange}
        />
        {error && <p style={{ color: "red" }}>{error.general}</p>}
        <Button
          text="회원가입 완료하기"
          fontSize="20px"
          onClick={handleSubmit}
          disabled={!values.road_address || !values.detail_address}
        />
      </Flex>
    </>
  );
};

export default SignUp;
