import React from "react";
import "./styles/Home.css";
import Header from "./components/Header";

const images = [
  require("./img/r1.jpg"),
  require("./img/r2.jpg"),
  require("./img/r3.jpg"),
  require("./img/r4.jpg"),
  require("./img/r5.jpg"),
  require("./img/r6.jpg"),
];

const Home = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="image-grid">
          {images.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image} alt="h"></img>
              <button className="view-button">Xem ngay</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
