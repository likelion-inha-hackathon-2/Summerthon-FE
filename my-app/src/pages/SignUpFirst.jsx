import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container/Container";
import Flex from "../components/Flex/Flex";
import Typo from "../components/Typo/Typo";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import Radio from "../components/Radio/Radio";
import useForm from "../hooks/useForm";

const SignUpFirst = () => {
  const { values, handleChange } = useForm({
    user_login_id: "",
    password: "",
    user_name: "",
    user_gender: "",
    user_phone: "",
    user_age: "1",
  });

  const genders = [
    { value: "M", label: "남자" },
    { value: "F", label: "여자" },
  ];

  const ages = Array.from({ length: 100 }, (_, k) => ({
    value: String(k + 1),
    label: String(k + 1),
  }));

  const navigate = useNavigate();

  const goToSecondPage = () => {
    console.log("First page data:", values);
    navigate("/signup/2", { state: values });
  };

  return (
    <Container>
      <Flex direction="column" align="left">
        <Typo text="회원가입 1" fontSize="24px" fontWeight="bold" />
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
        <Button text="다음 단계로" fontSize="20px" onClick={goToSecondPage} />
      </Flex>
    </Container>
  );
};

export default SignUpFirst;
