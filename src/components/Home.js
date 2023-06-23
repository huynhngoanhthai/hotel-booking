import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Header from "./Header";
import GlobalContext, { useAuth } from "../Context/GlobalContext";
import instance from "../utils/instance";
import { useNavigate } from "react-router-dom";

const images = [
  require("../img/r1.jpg"),
  require("../img/r2.jpg"),
  require("../img/r3.jpg"),
  require("../img/r4.jpg"),
  require("../img/r5.jpg"),
  require("../img/r6.jpg"),
];

const Home = () => {
  // const getPayload = localStorage.setItem("user", localStorage.getItem("user"));
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/companies");
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
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
