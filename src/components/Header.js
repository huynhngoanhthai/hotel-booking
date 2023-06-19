import React from "react";
import "../styles/Header.css";

const avatarImage = require("../img/avatar.png");
const Header = () => {
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
          className="avatar"
        />
      </div>
    </header>
  );
};

export default Header;
