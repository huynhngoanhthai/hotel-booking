import React, { useEffect, useState } from "react";
import instance from "../utils/instance";

const Profile = () => {
  const [userData, setUserData] = useState(null);

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

  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
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
    </div>
  );
};

export default Profile;
