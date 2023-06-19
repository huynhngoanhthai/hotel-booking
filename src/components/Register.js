import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/users/signup", {
        email,
        password,
      });
      console.log(response.status);
      if (response.status === 201) {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      if (
        error.response.data.statusCode == 400 &&
        error.response.data.error == "Bad Request"
      )
        alert("tài khoản đã tồn tại");
    }
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "24px", color: "#000000" }}>Register</h2>
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
            backgroundColor: "#36A0EC",
            color: "#FFFFFF",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
        <button
          type="button"
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2ecc71",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            marginLeft: "30px",
          }}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default Register;
