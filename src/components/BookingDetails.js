import React, { useEffect, useState } from "react";
import instance from "../utils/instance";
import "../styles/Booking.css";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Loading from "./loading";
const images = [
    require("../img/r1.jpg"),
    require("../img/r2.jpg"),
    require("../img/r3.jpg"),
    require("../img/r4.jpg"),
    require("../img/r5.jpg"),
    require("../img/r6.jpg"),
];
const BookingDetails = () => {
    const [roomData, setRoomData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [bookingData, setBookingData] = useState(null);



    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get("/bookings/" + id);
                setBookingData(response.data);
                setRoomData(response.data.room);
                setUserData(response.data.user);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    const acceptBooking = async (booking_id) => {
        if (!(await instance.get("/users/me")).data.admin) {
           return  navigate("/history-booking");
        }
        const body = {
            status: "accept"
        };
        try {
            // await instance.patch("/bookings/" + booking_id, body);
            const response = await instance.patch("/bookings/" + booking_id, body);
            console.log(response.data);
            navigate("/history-booking");
        } catch (error) {
            console.log(error.message);
            alert(error.response.data.message);
        }

    }
    const rejectBooking = async(booking_id)=>{
        if (!(await instance.get("/users/me")).data.admin) {
            const body = {
                status: "cancel"
            };
            try {
                await instance.patch("/bookings/" + booking_id, body);
                navigate("/history-booking");
            } catch (error) {
                console.log(error.message);
                alert(error.response.data.message);
            }
            return  navigate("/history-booking");
         }
         const body = {
             status: "accept"
         };
         try {
             await instance.patch("/bookings/" + booking_id, body);
             navigate("/history-booking");
         } catch (error) {
             console.log(error.message);
             alert(error.response.data.message);
         }
    }

    const convertDate = (dateString) => {

        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
        return formattedDate;
    }
    if (!roomData || !bookingData) {
        return <div><Loading /></div>;

    }

    return (
        <div>
            <Header />
            <>

                <div className="room-list">

                    <div className="image">
                        <img className="image-booking" src={images[(roomData?.id % 6)]} alt="Room" />
                    </div>
                    <div className="booking-details">
                        <h2 style={{marginLeft:"10px"}}> Thông Tin Đặt Phòng </h2>
                        <p className="details-wrapper"><strong>ID:</strong> {roomData?.id}</p>
                        <p className="details-wrapper" ><strong>tên phòng:</strong> {roomData?.name}</p>
                        <p className="details-wrapper" ><strong>Tầng:</strong> {roomData?.floor} 🏢</p>
                        <p className="details-wrapper" ><strong>trạng thái phòng:</strong> {roomData?.status ? 'Phòng Trống' : 'Hết Phòng'}</p>
                        <p className="details-wrapper" ><strong>loại phòng:</strong> {roomData.typeRoom?.name}</p>
                        <p className="details-wrapper" ><strong>Giá:</strong> {roomData?.typeRoom.price}$ 💰</p>
                        <p className="details-wrapper" ><strong>số người ở:</strong>   {roomData?.typeRoom.numberOfPeople}   🧑</p>
                        <p className="details-wrapper" ><strong>số giường:</strong>    {roomData?.typeRoom.numberOfBeds}   🛏️</p>
                        <p className="details-wrapper" ><strong>trạng thái đặt đòng:</strong>    {bookingData.status}   </p>
                        <p className="details-wrapper" ><strong>Ngày Nhận Phòng:</strong>    {convertDate(bookingData.checkInDate)}  </p>
                        <p className="details-wrapper" ><strong>Ngày Trả Phòng:</strong>    {convertDate(bookingData.checkOutDate)}  </p>
                        <p className="details-wrapper" ><strong>Tên:</strong>    {userData.name}  </p>
                        <p className="details-wrapper" ><strong>Email:</strong>    {userData.email}  </p>
                        <p className="details-wrapper" ><strong>số điện thoại:</strong>    {userData.phone}  </p>
                        <button className="add-button-accept" onClick={() => acceptBooking(bookingData.id)}> XÁC NHẬN </button>
                        <button className="add-button-reject" onClick={() => rejectBooking(bookingData.id)}> TỪ CHỐI </button>

                    </div>

                </div>

            </>
        </div>
    );
};

export default BookingDetails;
