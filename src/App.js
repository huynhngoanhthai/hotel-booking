import React from "react";
import "./App.css";
import Login from "./components/Login";

import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./components/Register";
import { AuthProvider } from "./Context/GlobalContext";

function App() {
  return (
    <AuthProvider>
      {" "}
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
