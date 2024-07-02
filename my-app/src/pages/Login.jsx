import React from "react";
import styled from "styled-components";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: #fff;
  border: 3px solid #e6e6e6;
  border-radius: 10px;
  width: 430px;
  max-width: 100%;
  height: 932px;
  padding: 0 20px;
  margin: 0 auto;
`;

const Title = styled.h1`
  position: relative;
  bottom: 100px;
  margin-bottom: 40px;
  font-size: 34px;
  font-weight: bold;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
  max-width: 300px;
  label {
    font-size: 14px;
    margin-bottom: 5px;
  }
  input {
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #e6e6e6;
  }
`;

const LoginButton = styled(Button)`
  width: 100%;
  position: relative;
  background-color: #0d99ff;
  padding: 10px 0;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  max-width: 300px;
  margin-top: 20px;
  &:hover {
    background-color: #007acc;
  }
`;

const SignupText = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: black;

  a {
    color: #0d99ff;
    text-decoration: none;
    margin-left: 5px;
  }
  a:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate("/main");
  };

  return (
    <LoginContainer>
      <Title>로그인</Title>
      <LoginForm>
        <label htmlFor="id">아이디</label>
        <input type="text" id="id" placeholder="아이디를 입력하세요" />
      </LoginForm>
      <LoginForm>
        <label htmlFor="pw">비밀번호</label>
        <input type="password" id="pw" placeholder="비밀번호를 입력하세요" />
      </LoginForm>
      <LoginButton text="로그인" onClick={goToMainPage}></LoginButton>
      <SignupText>
        회원이 아니신가요?
        <a href="/signup/1">회원가입</a>
      </SignupText>
    </LoginContainer>
  );
};

export default Login;
