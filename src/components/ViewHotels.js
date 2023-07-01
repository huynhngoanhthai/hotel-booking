import React, { useEffect, useState } from "react";
import instance from "../utils/instance";
import "../styles/Booking.css";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Loading from "./loading";
const images = [
    require("../img/hotels/h1.jpeg"),
    require("../img/hotels/h2.jpeg"),
    require("../img/hotels/h3.jpeg"),
    require("../img/hotels/h4.jpeg"),
    require("../img/hotels/h5.jpeg"),
    require("../img/hotels/h6.jpeg"),
    require("../img/hotels/h7.jpeg"),

];
const ViewHotels = () => {
    const [hotelsData, setHotelsData] = useState(null);
    const [roomData, setRoomDataTemp] = useState(null);

    const navigate = useNavigate();




    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get("/hotels/" + id);
                setHotelsData(response.data);

                setRoomDataTemp(response.data.rooms)
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const delay = setTimeout(() => {
            fetchData();
        }, 100);

        return () => {
            clearTimeout(delay);
        };

    }, [id]);

    const viewRoom = (room) => {
        navigate("/manager/booking/" + room.id)
    }

    const optionSuggest1 = () => {
        const filteredData = hotelsData.rooms.filter((item) =>
            item.typeRoom.price <= 100
        );
        setRoomDataTemp(filteredData);
    }
    const optionSuggest2 = () => {
        const filteredData = hotelsData.rooms.filter((item) =>
            item.typeRoom.price > 100 && item.typeRoom.price <= 200
        );
        console.log(filteredData);
        setRoomDataTemp(filteredData);
    }
    const optionSuggest3 = () => {
        const filteredData = hotelsData.rooms.filter((item) =>
            item.typeRoom.price > 200 && item.typeRoom.price <= 300
        );
        setRoomDataTemp(filteredData);
    }
    const optionSuggest4 = () => {
        const filteredData = hotelsData.rooms.filter((item) =>
            item.typeRoom.price > 300
        );
        setRoomDataTemp(filteredData);
    }




    if (!hotelsData) {
        return (
            <>
                <Loading />
            </>
        );
    }

    return (
        <div>
            <Header />
            {(
                <>
                    <div className="room-list">
                        <div className="image">
                            <img className="image-room" src={images[(id % 6)]} alt="Room" />
                        </div>
                        <div className="room-details">
                            <h2>Thông tin tiết khách sạn</h2>
                            <p className="details-wrapper"><strong>ID:</strong> {hotelsData.id}</p>
                            <p className="details-wrapper" ><strong>Tên:</strong> {hotelsData.name}</p>
                            <p className="details-wrapper" ><strong>Email:</strong> {hotelsData.email}</p>
                            <p className="details-wrapper" ><strong>Số điện thoại:</strong> {hotelsData.phone}</p>
                            <p className="details-wrapper" ><strong>Địa Chỉ:</strong> {hotelsData.address} </p>
                            <p className="details-wrapper" ><strong>Phòng:</strong> có {hotelsData.rooms.length} phòng</p>
                            <p className="details-wrapper" ><strong>Loại Phòng:</strong> có {hotelsData.typeRooms.length} loại phòng</p>
                            {hotelsData.comments.length !== 0 &&
                                <div className="details-wrapper">
                                    <h2>Bình luận khách sạn</h2>
                                    <ul className="comment-item-hotels">

                                        {hotelsData.comments.slice().sort((a, b) => b.id - a.id).map(comment => (
                                            <div className="comment-wrapper">
                                                <div> <p style={{fontWeight:"bold", fontStyle:"13"}}>{comment.user.name}</p>
                                                <li style={{ marginTop: "5px", marginBottom: "5px",padding: "10px", border: "2px solid black",borderRadius:"4px", backgroundColor: "white", maxWidth: "400px", wordWrap: "break-word" }}className="content" key={comment.id}>{comment.content}</li>
                                                </div>
                                            </div>
                                        ))}

                                    </ul>
                                </div>
                            }
                        </div>
                    </div>

                    <button class="btn" onClick={optionSuggest1}> dưới 100$
                    </button>
                    <button class="btn" onClick={optionSuggest2}> từ 100$ - 200$
                    </button>
                    <button class="btn" onClick={optionSuggest3}> từ 200$ - 300$
                    </button>
                    <button class="btn" onClick={optionSuggest4}> Trên 300$
                    </button>

                    <div style={{ marginTop: "5px",marginBottom:"10px" }} className="company-details">
                        <h2>Danh Sách Phòng</h2>
                    </div>
                    <div className="company-list">
                        {
                            roomData.map((company) => (
                                <div key={company.id} className="company-item">
                                    <div className="input-row">
                                        <label>Tên:</label>
                                        <input
                                            type="text"
                                            defaultValue={company.name}
                                            readOnly
                                        />
                                    </div>
                                    <div className="input-row">
                                        <label>Tầng:</label>
                                        <input
                                            defaultValue={company.floor}
                                            readOnly
                                        />
                                    </div>
                                    <div className="input-row">
                                        <label>Trạng Thái phòng:</label>
                                        <select
                                            defaultValue={!company.status ? "false" : "true"}
                                            readOnly
                                        >
                                            <option>{!company.status ? "Phòng Đã Đặt" : "Phòng Trống"}</option>
                                        </select>
                                    </div>
                                    <div className="input-row">
                                        <label>Loại Phòng:</label>
                                        <select
                                            defaultValue={company.typeRoom.name}
                                            readOnly
                                        >
                                            <option value={company.typeRoom.name}>
                                                {company.typeRoom.name}
                                            </option>

                                        </select>
                                    </div>

                                    <div className="input-row">
                                        <label>Giá:</label>
                                        <input
                                            defaultValue={company.typeRoom.price}
                                            readOnly
                                        />
                                    </div>
                                    <div className="input-row">
                                        <label>Số Người Ở:</label>
                                        <input
                                            defaultValue={company.typeRoom.numberOfPeople}
                                            readOnly
                                        />
                                    </div>
                                    <div className="input-row">
                                        <label>Số Giường Ngủ:</label>
                                        <input
                                            defaultValue={company.typeRoom.numberOfBeds}
                                            readOnly
                                        />
                                    </div>
                                    <button className="view-button" onClick={() => { viewRoom(company) }}>
                                        Xem
                                    </button>

                                </div>
                            ))}
                    </div>
                    <div className="company-details">
                        <h2>Danh Sách Loại Phòng</h2>
                    </div>
                    <div className="company-list">
                        {
                            hotelsData.typeRooms.map((company) => (
                                <div key={company.id} className="company-item">
                                    <div className="input-row">
                                        <label>Tên:</label>
                                        <input
                                            type="text"
                                            defaultValue={company.name}
                                            readOnly
                                        />
                                    </div>
                                    <div className="input-row">
                                        <label>Giá:</label>
                                        <input
                                            type="number"
                                            defaultValue={company.price}
                                            readOnly
                                        />
                                    </div>
                                    <div className="input-row">
                                        <label>Số Người Ở:</label>
                                        <input
                                            type="number"
                                            defaultValue={company.numberOfPeople}
                                            readOnly
                                        />
                                    </div>
                                    <div className="input-row">
                                        <label>Số Giường Ngủ:</label>
                                        <input
                                            type="number"
                                            defaultValue={company.numberOfBeds}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                </>

            )}
        </div>)
};

export default ViewHotels;
