import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import tw from "tailwind-styled-components";
function App() {
  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/details" element={<></>} />
      </Routes>
    </Wrapper>
  );
}
const Wrapper = tw.div<any>`
  flex flex-col h-screen
`;

export default App;
