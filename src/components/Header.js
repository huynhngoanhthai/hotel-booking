import React, { useState } from "react";
import "../styles/Header.css";

const avatarImage = require("../img/avatar.png");
const Header = () => {
  const [isListVisible, setListVisible] = useState(false);
  const [isAvatarActive, setAvatarActive] = useState(false);
  const toggleList = () => {
    setListVisible(!isListVisible);
    setAvatarActive(!isAvatarActive);
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
        <h1 className="hotels-title">HOTEL</h1>
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
          <li>đăng xuất</li>
        </ul>
      )}
    </header>
  );
};

export default Header;
