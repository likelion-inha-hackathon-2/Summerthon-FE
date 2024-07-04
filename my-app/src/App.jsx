import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; // 홈(시작)
import Login from "./pages/Login"; // 로그인
import SignUp from "./pages/SignUp"; // 회원가입 1
import Main from "./pages/Main"; // 메인 페이지(호출 방식을 선택)
import Call from "./pages/Call"; // 일반 호출
import MyInfo from "./pages/MyInfo"; // 내정보
import MoreMyInfo from "./pages/MoreMyInfo";
import ArriveLocation from "./pages/ArriveLocation"; // QR 스캔1 (주소지 목록 불러오기)
import Scan from "./pages/Scan"; // QR 스캔2
import EmerCall from "./pages/EmerCall"; // 긴급 호출
import Layout from "./components/Layout/Layout"; // 레이아웃 컴포넌트 추가

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/main" element={<Main />} />
          <Route path="/call" element={<Call />} />
          <Route path="/me" element={<MyInfo />} />
          <Route path="/more-me" element={<MoreMyInfo />} />
          <Route path="/arrive-location" element={<ArriveLocation />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/emercall" element={<EmerCall />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
