import React, { useEffect, useState } from "react";
import { FaTrash } from 'react-icons/fa';
import instance from "../utils/instance";
import "../styles/Booking.css";
import { useParams } from "react-router-dom";
import Header from "./Header";
const images = [
  require("../img/r1.jpg"),
  require("../img/r2.jpg"),
  require("../img/r3.jpg"),
  require("../img/r4.jpg"),
  require("../img/r5.jpg"),
  require("../img/r6.jpg"),
];
const Booking = () => {
  const [roomData, setRoomData] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [userData, setUserData] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [content, setContent] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/rooms/" + id);
        setRoomData(response.data);
        const res = await instance.get("/hotels/" + response.data.hotel.id);
        setCommentData(res.data.comments.slice().sort((a, b) => a.id - b.id));
        const res1 = await instance.get("/users/me");
        setUserData(res1.data);

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);
  const addBooking = () => {
    setShowForm(true);
  };
  const cannelBooking = () => {
    setShowForm(false);
  };

  const addComment = async () => {
    if (content === "") {
      return setContent("");
    }
    try {
      const response = await instance.post("/comments", {
        content: content,
        hotelId: roomData.hotel.id.toString()
      });
      setCommentData([...commentData, response.data]);
      setContent("");
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log({
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      roomId: id.toString()
    }
    );
    try {
      await instance.post("/bookings", {
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        roomId: id.toString()
      });
      alert("Thêm thành công");

    } catch (error) {
      console.log(error);
      alert(error.response.data.message);

    }
    cannelBooking();
  };

  const deleteComment = async (id) => {
    try {
      await instance.delete("/comments/" + id);
      const updatedComments = commentData.filter(comment => comment.id !== id);
      setCommentData(updatedComments);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };


  if (!roomData || !commentData || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      {!showForm && (
        <><div className="room-list">

          <div className="image">
            <img className="image-room" src={images[(roomData.id % 6)]} alt="Room" />
          </div>
          <div className="room-details">
            <h2>Room Details</h2>
            <p className="details-wrapper"><strong>ID:</strong> {roomData.id}</p>
            <p className="details-wrapper" ><strong>Name:</strong> {roomData.name}</p>
            <p className="details-wrapper" ><strong>Floor:</strong> {roomData.floor} 🏢</p>
            <p className="details-wrapper" ><strong>Status:</strong> {roomData.status ? 'True' : 'False'}</p>
            <p className="details-wrapper" ><strong>Type Room:</strong> {roomData.typeRoom.name}</p>
            <p className="details-wrapper" ><strong>Price:</strong> {roomData.typeRoom.price}$ 💰</p>
            <p className="details-wrapper" ><strong>Number of people:</strong>   {roomData.typeRoom.numberOfPeople}   🧑</p>
            <p className="details-wrapper" ><strong>Number of beds:</strong>    {roomData.typeRoom.numberOfBeds}   🛏️</p>
            <p className="details-wrapper" ><strong>Hotel:</strong> {roomData.hotel.name} 🏨</p>
            <p className="details-wrapper" ><strong>Address Hotel:</strong> {roomData.hotel.address} 📍</p>
            <button className="add-button-booking" onClick={addBooking}> Booking</button>
          </div>


        </div><div className="hotel-comment">
            <h2>Comments Hotel</h2>
            <ul>
              {commentData.slice(-20).map(comment => (
                <div className="comment-wrapper">
                  <li key={comment.id}>{comment.content}</li>{userData.admin &&
                    <FaTrash className="delete-icon" onClick={() => deleteComment(comment.id)} />}
                </div>
              ))}
            </ul>
            <input
              className="input-comment" type="text"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              onKeyDown={(event) => event.keyCode === 13 ? addComment() : undefined} />
            <button className="add-button" onClick={addComment}> comment</button>
          </div></>
      )

      }
      {showForm && (
        <div className="company-list">
          <form className="company-item" onSubmit={handleFormSubmit}>
            <div className="input-row">
              <label>Check In Date:</label>
              <input
                value={checkInDate}
                type="date"
                onChange={(event) => setCheckInDate(event.target.value)}
              />
            </div>
            <div className="input-row">
              <label>Check On Date:</label>
              <input

                value={checkOutDate}
                type="date"
                onChange={(event) => setCheckOutDate(event.target.value)}
              />
            </div>
            <button type="submit" className="update-button">
              Lưu
            </button>
            <button
              type="button"
              className="delete-button"
              onClick={cannelBooking}
            >
              Hủy
            </button>
          </form>
        </div>



       
      )}



    </div>
  );
};

export default Booking;
