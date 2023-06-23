import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import instance from "../utils/instance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/users/signin", {
        email,
        password,
      });
      console.log(response.data);
      if (response.status === 201) {
        navigate("/home");
        sessionStorage.setItem("user", response.data);
      }
    } catch (error) {
      console.error(error);
      if (
        error.response.data.statusCode == 400 &&
        error.response.data.error == "Bad Request"
      )
        alert("Mật khẩu hoặc tài khoản không đúng.");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto" }}>
      <h2>Login</h2>
      <form style={{ marginTop: "20px" }} onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#3498db",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleRegister}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2ecc71",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default Login;
