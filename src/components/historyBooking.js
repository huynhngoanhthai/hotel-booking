import React, { useEffect, useState } from "react";
import instance from "../utils/instance";
import "../styles/Profile.css";
import Header from "./Header";

const HistoryBooking = () => {
    const [userData, setUserData] = useState(null);
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
                <div key={room.id} className="company-list">
                    <div className="company-item">
                        <div className="input-row">
                            <label>Check In Date:</label>
                            <input
                                type="date"
                                defaultValue={new Date(room.checkInDate).toISOString().split('T')[0]}
                                readOnly    
                            />
                        </div>

                        <div className="input-row">
                            <label>Check Out Date:</label>
                            <input
                                type="date"
                                defaultValue={new Date(room.checkOutDate).toISOString().split('T')[0]}
                                readOnly
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

export default HistoryBooking;
