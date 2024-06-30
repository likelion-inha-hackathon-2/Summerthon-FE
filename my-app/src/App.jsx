import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUpFirst from "./pages/SignUpFirst";
import SignUpSecond from "./pages/SignUpSecond";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup/1" element={<SignUpFirst />} />
        <Route path="/signup/2" element={<SignUpSecond />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
