import React, { useEffect, useState } from "react";
import instance from "../utils/instance";
import "../styles/Manager.css";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

const CompanyDetails = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/companies/" + id);
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="company-details">
        <h2>Company Details</h2>
        <p>ID: {userData.id}</p>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
        <p>Phone: {userData.phone}</p>
        <p>Address: {userData.address}</p>
      </div>
    </div>
  );
};

export default CompanyDetails;
