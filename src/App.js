import React from "react";
import "./App.css";
import Login from "./components/Login";

import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./components/Register";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/home" element={<Home></Home>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
    </Routes>
  );
}

export default App;
