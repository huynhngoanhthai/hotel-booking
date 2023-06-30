import React, { useEffect, useState } from "react";
import instance from "../utils/instance";
import "../styles/Profile.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Loading from "./loading";

const HistoryBooking = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get("/users/me");
                if (response.data.admin === true) {
                    const response1 = await instance.get("/bookings");
                    response.data.bookings = response1.data;
                }
                setUserData(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
                navigate("/login");
            }
        };
        const delay = setTimeout(() => {
            fetchData();
        }, 100);
        return () => {
            clearTimeout(delay);
        };
    }, []);

    const viewRoom = (room) => {
        console.log(room.id);
        navigate("/manager/BookingDetails/" + room.id);
    };

    const deleteHistoryBook = async (room) => {
        try {
            await instance.delete("/bookings/" + room.id);
            const updatedUserData = userData.bookings.filter((c) => c.id !== room.id);
            console.log(updatedUserData);
            setUserData({ ...userData, bookings: updatedUserData });
        } catch (error) {

        }
    }
    if (!userData) {
        return <div><Loading /></div>;
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
            <div className="company-list">
                {userData.bookings.map((room) => (

                    <div className="company-item">
                        <div className="input-row">
                            <label>Check In :</label>
                            <input
                                type="date"
                                defaultValue={new Date(room.checkInDate).toISOString().split('T')[0]}
                                readOnly
                            />
                        </div>

                        <div className="input-row">
                            <label>Check Out :</label>
                            <input
                                type="date"
                                defaultValue={new Date(room.checkOutDate).toISOString().split('T')[0]}
                                readOnly
                            />
                        </div>

                        <div className="input-row">
                            <label>Trạng Thái Booking:</label>
                            <input
                                type="text"
                                defaultValue={room.status}
                                readOnly
                            />
                        </div>
                        <button className="view-button" onClick={() => viewRoom(room)}>
                            Xem
                        </button>
                        <button className="update-button" onClick={() => viewRoom(room)}>
                            Xác Nhận
                        </button>
                        <button className="delete-button" onClick={() => deleteHistoryBook(room)}>
                            Từ Chối
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoryBooking;
