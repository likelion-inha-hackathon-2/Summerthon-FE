import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUpFirst from "./pages/SignUpFirst";
import SignUpSecond from "./pages/SignUpSecond";
import Main from "./pages/Main";
import Call from "./pages/Call";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
