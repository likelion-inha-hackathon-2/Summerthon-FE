import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route >
          <Route path="/" element={<StartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
