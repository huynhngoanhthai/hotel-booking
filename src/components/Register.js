import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Register = () => {
  const [userName, setUserName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== passwordConfirm) {
        return alert("Password không khớp!");
      }
      const response = await axios.post("http://localhost:3000/users/signup", {
        name: userName,
        email,
        phone,
        password,
      });
      console.log(response.status);
      if (response.status === 201) {
        navigate("/login");
        alert("đăng ký thành công vui lòng đăng nhập !!");
      }
    } catch (error) {
      console.error(error);
      if (
        error.response.data.statusCode === 400 &&
        error.response.data.error === "Bad Request"
      )
        alert("Yêu cầu Không Hợp Lệ!");
    }
  };
  const handleLogin = () => {
    navigate("/login");
  };

  // return (
  //   <div style={{ maxWidth: "300px", margin: "0 auto" }}>
  //     <h2 style={{ fontSize: "24px", color: "#000000" }}>Register</h2>
  //     <form style={{ marginTop: "20px" }} onSubmit={handleSubmit}>
  //       <div>
  //         <label>Email:</label>
  //         <input
  //           type="email"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //           style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
  //           required
  //         />
  //       </div>
  //       <div>
  //         <label>Password:</label>
  //         <input
  //           type="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
  //           required
  //         />
  //       </div>
  //       <button
  //         type="submit"
  //         style={{
  //           backgroundColor: "#36A0EC",
  //           color: "#FFFFFF",
  //           padding: "10px 20px",
  //           borderRadius: "5px",
  //           cursor: "pointer",
  //         }}
  //       >
  //         Register
  //       </button>
  //       <button
  //         type="button"
  //         onClick={handleLogin}
  //         style={{
  //           padding: "10px 20px",
  //           backgroundColor: "#2ecc71",
  //           color: "#fff",
  //           border: "none",
  //           cursor: "pointer",
  //           marginLeft: "30px",
  //         }}
  //       >
  //         Back
  //       </button>
  //     </form>
  //   </div>
  // );



  return (
    <div className="main">
      <Header />
      <form action="" className="form_main"  onSubmit={handleSubmit}>
        <p class="heading">Đăng Ký</p>
        <div class="inputContainer">
          <svg class="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          </svg>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text" class="inputField" id="username" placeholder="Username" />
        </div>

        <div class="inputContainer">
          <svg class="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
          </svg>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email" class="inputField" id="email" placeholder="Email" />
        </div>

        <div class="inputContainer">
          <svg class="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
          </svg>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel" class="inputField" id="phone" placeholder="Phone" />
        </div>

        <div class="inputContainer">
          <svg class="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password" class="inputField" id="password" placeholder="Password" />
        </div>
        <div class="inputContainer">
          <svg class="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            type="password" class="inputField" id="passwordConfirm" placeholder="Confirm Password" />
        </div>

        <button id="button"  type="submit">Dăng Ký</button>
        <a class="forgotLink" href="/#" onClick={handleLogin}>Bạn chưa có tài khoản?</a>
      </form>
    </div>
  );
};

export default Register;
