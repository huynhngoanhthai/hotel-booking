import React, { useState } from "react";
import "../styles/Header.css";

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
  const profile = async () => {
    navigate("/profile");
  };
  const manager = async () => {
    navigate("/manager");
  };
  const home = async () => {
    navigate("/home");
  };
  const historyBooking = () => {
    navigate("/history-booking");

  }

  return (
    <header className="header">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1
          style={{ cursor: "pointer" }}
          onClick={home}
          className="hotels-title"
        >
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
          <li onClick={profile}>Hồ sơ cá nhân</li>
          <li onClick={manager}>Quản lý</li>
          <li onClick={historyBooking}>lịch sử Booking</li>
          <li onClick={clickLogout}>đăng xuất</li>
        </ul>
      )}
    </header>
  );
};

export default Header;
