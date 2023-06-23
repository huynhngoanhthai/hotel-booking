import React, { useEffect, useState } from "react";
import instance from "../utils/instance";
import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/users/me");
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const backToHome = () => {
    navigate("/home");
  };

  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div>
        <strong>Email:</strong> {userData.email}
      </div>
      <div>
        <strong>ID:</strong> {userData.id}
      </div>
      <div>
        <strong>Admin:</strong> {userData.admin ? "Yes" : "No"}
      </div>
      <div>
        <strong>Comments:</strong> {userData.comments.length}
      </div>
      <div>
        <strong>Bookings:</strong> {userData.bookings.length}
      </div>
      <button> cập nhật </button> <button onClick={backToHome}> Back </button>
    </div>
  );
};

export default Profile;
