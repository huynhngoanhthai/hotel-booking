import React, { useEffect, useState } from "react";
import instance from "../utils/instance";
import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get("/users/me");
                setUserData(response.data);
                console.log(response.data);
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
    if (userData.bookings.length === 0) {
        return (<><Header /><div className="profile-container"><h2>chua co lich su</h2> </div></>)
    }
    return (
        <div >
            <Header />
            <div className="company-details">
                <h2>history booking</h2>
            </div >
            {userData.bookings.map((room) => (
                <div className="company-list">
                    <div key={room.id} className="company-item">
                        <div className="input-row">
                            <label>Check In Date:</label>
                            <input
                                type="date"
                                defaultValue={new Date(room.checkInDate).toISOString().split('T')[0]}
                            />
                        </div>
                        <div className="input-row">
                            <label>Check Out Date:</label>
                            <input
                                type="date"
                                defaultValue={new Date(room.checkOutDate).toISOString().split('T')[0]}
                            />
                        </div>
                        <button className="view-button" onClick={() => (room)}>
                            Xem
                        </button>
                        <button className="update-button" onClick={() => (room)}>
                            hoàn lại
                        </button>
                        <button className="delete-button" onClick={() => (room)}>
                            Xóa
                        </button>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default Profile;
