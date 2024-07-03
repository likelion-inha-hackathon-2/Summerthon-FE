import React from "react";
import Container from "../components/Container/Container";
import Flex from "../components/Flex/Flex";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import authApi from "../apis/authApi";
import useForm from "../hooks/useForm";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { values, handleChange } = useForm({
    user_login_id: "",
    user_pwd: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.post("/login", {
        user_login_id: values.user_login_id,
        user_pwd: values.user_pwd,
      });
      console.log(response.data);
      if (response.data && response.data.status === "200") {
        localStorage.setItem("accessToken", response.data.access_token);
        localStorage.setItem("refreshToken", response.data.refresh_token);
        authApi.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;
        navigate("/main");
      } else {
        alert(response.data.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        alert(error.response.data.message || "로그인에 실패했습니다.");
      } else if (error.request) {
        alert("서버와의 통신에 실패했습니다. 네트워크 연결을 확인해주세요.");
      } else {
        alert("로그인 처리 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <Container>
      <Flex direction="column" justify="center" align="center">
        <h1>로그인</h1>
        <form onSubmit={handleLogin}>
          <Input
            label="아이디"
            type="text"
            name="user_login_id"
            value={values.user_login_id}
            onChange={handleChange}
            placeholder="아이디를 입력하세요"
          />
          <Input
            label="비밀번호"
            type="password"
            name="user_pwd"
            value={values.user_pwd}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
          />
          <Button text="로그인" type="submit" />
        </form>
        <div>
          회원이 아니신가요? <Link to="/signup/1">회원가입</Link>
        </div>
      </Flex>
    </Container>
  );
};

export default Login;
