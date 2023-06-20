import React, { useState } from "react";
import "../styles/Header.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import instance from "../utils/instance";

const avatarImage = require("../img/avatar.png");
const Header = () => {
  const [isListVisible, setListVisible] = useState(false);
  const [isAvatarActive, setAvatarActive] = useState(false);
  const navigate = useNavigate();
  const toggleList = () => {
    setListVisible(!isListVisible);
    setAvatarActive(!isAvatarActive);
  };
  const clickLogout = async () => {
    try {
      await instance.post("/users/signout");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="header">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="hotels-title">
          HOTEL<span>.</span>
        </h1>
        <img
          style={{ display: "block" }}
          src={avatarImage}
          alt="Avatar"
          className={`avatar ${isAvatarActive ? "active" : ""}`}
          onClick={toggleList}
        />
      </div>
      {isListVisible && (
        <ul className="list">
          <li>Hồ sơ cá nhân</li>
          <li onClick={clickLogout}>đăng xuất</li>
        </ul>
      )}
    </header>
  );
};

export default Header;
