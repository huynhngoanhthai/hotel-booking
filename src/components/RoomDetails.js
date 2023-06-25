import React, { useEffect, useState } from "react";
import instance from "../utils/instance";
import "../styles/room.css";
import { useParams } from "react-router-dom";
import Header from "./Header";

const RoomDetails = () => {
    const [roomData, setRoomData] = useState(null);
    const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/rooms/"+ id);
        setRoomData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  });

  
  if (!roomData) {
    return <div>Loading...</div>;
  } 

  return (
    <div>
      <Header />
      <div className="room-details">
        <h2>Room Details</h2>
        <p><strong>ID:</strong> {roomData.id}</p>
        <p><strong>Name:</strong> {roomData.name}</p>
        <p><strong>Floor:</strong> {roomData.floor} 🏢</p>
        <p><strong>Status:</strong> {roomData.status ? 'True' : 'False'}</p>
        <p><strong>Type Room:</strong> {roomData.typeRoom.name}</p>
        <p><strong>Price:</strong> {roomData.typeRoom.price}$ 💰</p>
        <p><strong>Number of people:</strong>   {roomData.typeRoom.numberOfPeople}   🧑</p>
        <p><strong>Number of beds:</strong>    {roomData.typeRoom.numberOfBeds}   🛏️</p>
        <p><strong>Hotel:</strong> {roomData.hotel.name} 🏨</p>
      </div>
      
    </div>
  );
};

export default RoomDetails;
