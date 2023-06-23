import React, { useEffect, useState } from "react";
import instance from "../utils/instance";
import "../styles/Manager.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Manager = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/users/me");
        setUserData(response.data);
        console.log(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const backToProfile = () => {
    navigate("/profile");
  };
  const managerCompanies = () => {
    navigate("/manager/companies");
  };
  if (!userData) {
    return <div>Loading...</div>;
  }

  if (!userData.admin) {
    backToProfile();
    return null;
  }

  return (
    <div>
      <Header />
      <div className="function-list">
        <ul>
          <li onClick={managerCompanies}>Quản lý công ty</li>
          <li>Quản lý khách sạn</li>
          <li>Quản lý phòng</li>
        </ul>
      </div>
    </div>
  );
};

export default Manager;
