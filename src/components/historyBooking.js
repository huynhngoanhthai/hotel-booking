import React, { useEffect, useState } from "react";
import instance from "../utils/instance";
import "../styles/Profile.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const HistoryBooking = () => {
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
                navigate("/login");
            }
        };

        fetchData();
    }, []);
   
    const viewRoom = (room) => {
        console.log(room.id);
        navigate("/manager/booking/" + room.id);
    };
    const deleteHistoryBook = async(room) => {
        try {
            await instance.delete("/bookings/"+room.id);
            const updatedUserData = userData.bookings.filter((c) => c.id !== room.id);
            console.log(updatedUserData);
            setUserData({...userData,bookings: updatedUserData});
        } catch (error) {
            
        }
    }
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
                        
                        <button className="view-button" onClick={() => viewRoom(room)}>
                            Xem
                        </button>
                    
                        <button className="delete-button" onClick={() => deleteHistoryBook(room)}>
                            Xóa
                        </button>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default HistoryBooking;
