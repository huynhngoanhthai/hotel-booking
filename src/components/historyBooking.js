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
        if(booking_id.status === 'cancel'){
            return alert('Người Dùng Đã Hủy Phòng Bạn Không Thể  Thay Đổi');
        }
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
    const cancelHistoryBook = async (booking_id) => {

        if(booking_id.status !== "new"){
            return alert("Trạng Thái Đã Được Chập Thuận Bạn Không Thể  Hủy");
        }

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
        if(booking_id.status === 'cancel'){
            return alert('Người Dùng Đã Hủy Phòng Bạn Không Thể  Thay Đổi');
        }
        const body = {
            status: "accept"
        };
        try {
            await instance.patch("/bookings/" + booking_id.id, body);
            const updateData = userData.bookings.map(booking => booking.id === booking_id.id ? { ...booking, status: body.status } : booking);
            setUserData({ ...userData, bookings: updateData });
        } catch (error) {
            console.log(error.message);
            alert(error.response?.data.message || error.message);
        }
    }
    const checkStatus = (status) => {
        if (status === 'new')
            return "new-status";
        if (status === 'cancel')
            return "cancel-status";
        if (status === 'accept')
            return "accept-status";
        if (status === 'reject')
            return "cancel-status";
    };
    const statusVN = (status) => {
        if (status === 'new')
            return "Mới";
        if (status === 'cancel')
            return "Hủy";
        if (status === 'accept')
            return "Chấp Nhập";
        if (status === 'reject')
            return "Từ Chối";

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
            <h2 style={{ textAlign: "center" }}>Lịch Sử  Đặt Phòng</h2>
            {/* </div > */}
            <div className="booking-list">
                {userData.bookings.map((booking) => (
                    <div className="company-item">
                         <div className="input-row">
                            <label>ID Đặt Phòng:</label>
                            <input
                                type="text"
                                value={booking.id}
                                readOnly
                            />
                        </div>

                        <div className="input-row">
                            <label>Ngày Đặt Phòng:</label>
                            <input
                                type="date"
                                defaultValue={new Date(booking.checkInDate).toISOString().split('T')[0]}
                                readOnly
                            />
                        </div>

                        <div className="input-row">
                            <label>Ngày Trả Phòng:</label>
                            <input
                                type="date"
                                defaultValue={new Date(booking.checkOutDate).toISOString().split('T')[0]}
                                readOnly
                            />
                        </div>

                        <div className="input-row">
                            <label>Trạng Thái Đặt:</label>
                            <input
                                className={checkStatus(booking.status)}
                                type="text"
                                value={statusVN(booking.status)}
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
