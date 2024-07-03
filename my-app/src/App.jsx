import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; // 홈(시작)
import Login from "./pages/Login"; // 로그인
import SignUpFirst from "./pages/SignUpFirst"; // 회원가입 1
import SignUpSecond from "./pages/SignUpSecond"; // 회원가입2
import Main from "./pages/Main";
import Call from "./pages/Call"; // 일반 호출
import MyInfo from "./pages/MyInfo"; // 내정보
import ArriveLocation from "./pages/ArriveLocation"; // QR 스캔
import EmerCall from "./pages/EmerCall"; // 긴급 호출

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/1" element={<SignUpFirst />} />
        <Route path="/signup/2" element={<SignUpSecond />} />
        <Route path="/main" element={<Main />} />
        <Route path="/call" element={<Call />} />
        <Route path="/me" element={<MyInfo />} />
        <Route path="/arrive-location" element={<ArriveLocation />} />
        <Route path="/emercall" element={<EmerCall />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
