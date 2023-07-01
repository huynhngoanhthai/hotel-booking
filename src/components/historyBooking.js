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

    const deleteHistoryBook = async (booking_id) => {

        const body = {
            status: "reject"
        };
        try {
            await instance.patch("/bookings/" + booking_id.id, body);
            const updatedUserData = userData.bookings.map(booking => booking.id === booking_id.id ? { ...booking, status: body.status } : booking)
            // console.log(updatedUserData);
            setUserData({ ...userData, bookings: updatedUserData });
        } catch (error) {
            console.log(error.message);
            alert(error.response?.data.message || error.message);
        }
    }
    const cancelHistoryBook = async(booking_id) => {
        const body = {
            status: "cancel"
        };
        try {
            await instance.patch("/bookings/" + booking_id.id, body);
            const updatedUserData = userData.bookings.map(booking => booking.id === booking_id.id ? { ...booking, status: body.status } : booking)
            setUserData({ ...userData, bookings: updatedUserData });
        } catch (error) {
            console.log(error.message);
            alert(error.response?.data.message || error.message);
        }
    }
    const acceptBooking = async (booking_id) => {
        const body = {
            status: "accept"
        };
        try {
            await instance.patch("/bookings/" + booking_id.id, body);
            const updateData = userData.bookings.map(booking => booking.id === booking_id.id ? { ...booking, status: body.status } : booking);
            // console.log(updateData);            
            setUserData({ ...userData, bookings: updateData });
        } catch (error) {
            console.log(error.message);
            alert(error.response?.data.message || error.message);
        }
    }
    const checkStatus = (status)=>{
        if (status = 'new')
            return "new-status";
        if (status = 'cancel')
            return "cancel-status";
        if (status = 'accept')
            return "accept-accept";
        if (status = 'reject')
            return "cancel-accept";
        


    }

    if (!userData) {
        return <div><Loading /></div>;
    }
    if (userData.bookings.length === 0) {
        return (<><Header /><div className="profile-container"><h2>chua co lich su</h2> </div></>)
    }
    // console.log(userData);

    return (
        <div >
            <Header />
            {/* <div className="company-details"> */}
            <h2 style={{ textAlign: "center" }}>history booking</h2>
            {/* </div > */}
            <div className="booking-list">
                {userData.bookings.map((booking) => (
                    <div className="company-item">
                        <div className="input-row">
                            <label>Check In :</label>
                            <input
                                type="date"
                                defaultValue={new Date(booking.checkInDate).toISOString().split('T')[0]}
                                readOnly
                            />
                        </div>

                        <div className="input-row">
                            <label>Check Out :</label>
                            <input
                                type="date"
                                defaultValue={new Date(booking.checkOutDate).toISOString().split('T')[0]}
                                readOnly
                            />
                        </div>

                        <div className="input-row">
                            <label>Trạng Thái Booking:</label>
                            <input
                                className={checkStatus(booking.status)}
                                type="text"
                                value={booking.status}
                                readOnly
                            //     "
                            //     ${booking.status === 'new' ? 'new-status' : ''}
                            //     ${booking.status === 'cancel' ? 'cancel-status' : ''}
                            //     ${}
                            // "
                            />
                        </div>
                        <button className="view-button" onClick={() => viewRoom(booking)}>
                            Xem
                        </button>

                        {userData.admin &&
                            <>
                                <button className="update-button" onClick={() => acceptBooking(booking)}>
                                    Xác Nhận
                                </button>
                                <button className="delete-button" onClick={() => deleteHistoryBook(booking)}>
                                    Từ Chối
                                </button>
                            </>}
                        {!userData.admin &&
                            <>
                                <button className="delete-button" onClick={() => cancelHistoryBook(booking)}>
                                    Hủy
                                </button>
                            </>}

                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoryBooking;
