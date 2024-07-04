import React from "react";
import Flex from "../components/Flex/Flex";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import authApi from "../apis/authApi";
import useForm from "../hooks/useForm";
import { useNavigate, Link } from "react-router-dom";
import Header2 from "../components/Header/Header2";

const Login = () => {
  const { values, handleChange } = useForm({
    user_login_id: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.post("/login", {
        user_login_id: values.user_login_id,
        password: values.password,
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
        alert("서버와의 통신에 실패했습니다.");
      } else {
        alert("로그인에 실패했습니다.");
      }
    }
  };

  return (
    <>
      <Header2 />
      <Flex
        direction="column"
        justify="center"
        align="center"
        style={{
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <h1>로그인</h1>
        <form
          onSubmit={handleLogin}
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <Input
            label="아이디"
            type="text"
            name="user_login_id"
            value={values.user_login_id}
            onChange={handleChange}
            placeholder="아이디를 입력하세요"
            style={{ marginBottom: "10px" }}
          />
          <Input
            label="비밀번호"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            style={{ marginBottom: "20px" }}
          />
          <Button text="로그인" type="submit" style={{ width: "100%" }} />
        </form>
        <div style={{ marginTop: "20px" }}>
          회원이 아니신가요?{" "}
          <Link
            to="/signup"
            style={{ textDecoration: "none", color: "#0d99ff" }}
          >
            <span>회원가입</span>
          </Link>
        </div>
      </Flex>
    </>
  );
};

export default Login;
