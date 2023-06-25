import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Header from "./Header";
import instance from "../utils/instance";
import { useNavigate } from "react-router-dom";



const Home = () => {
  // const getPayload = localStorage.setItem("user", localStorage.getItem("user"));
  const [useData, setUseData] = useState(null);
  const [hotelData, setHotelData] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/rooms");
        setUseData(response.data);
        const res = await instance.get("/hotels");
        setHotelData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const viewRoom = (room) => {
    navigate("/manager/booking/"+room.id)
  }

  const viewHotel = async (hotel) => {
    try {
      const response = await instance.get("/hotels/"+hotel.id);
      setUseData(response.data.rooms);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }

  if (!useData || !hotelData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Header />
      <div className="company-details">
        <h2>Danh Sach Hotels</h2>
      </div>
      <div className="company-list">
        { hotelData.map((company) => (
            <div key={company.id} className="company-item">
              <div className="input-row">
                <label>Name:</label>
                <input
                  type="text"
                  defaultValue={company.name}
                  readOnly
                />
              </div>  
              <div className="input-row">
                <label>Email:</label>
                <input
                  type="text"
                  defaultValue={company.email}
                  readOnly
                />
              </div>
              <div className="input-row">
                <label>Phone:</label>
                <input
                  type="text"
                  defaultValue={company.phone}
                  readOnly
                />
              </div>  
              <div className="input-row">
                <label>Address:</label>
                <input
                  type="text"
                  defaultValue={company.address}
                  readOnly
                />
              </div>    
        
              <button className="view-button" onClick={() => {viewHotel(company)}}>
                Xem
              </button>
             
            </div>
        ))}
      </div>
      <div className="company-details">
        <h2>Danh Sach Phong</h2>
      </div>
      <div className="company-list">
        { useData.map((company) => (
            <div key={company.id} className="company-item">
              <div className="input-row">
                <label>Name:</label>
                <input
                  type="text"
                  defaultValue={company.name}
                  readOnly
                />
              </div>  
              <div className="input-row">
                <label > Floor:</label>
                <input
                  type="text"
                  defaultValue={company.floor}
                  readOnly
                />
              </div>

              <div className="input-row">
                <label > Status:</label>
                <input
                  type="text"
                  defaultValue={company.status}
                  readOnly
                />
              </div>
              <div className="input-row">
                <label > Type Room:</label>
                <input
                  type="text"
                  defaultValue={company.typeRoom.name}
                  readOnly
                />
              </div>
              
              <div className="input-row">
                <label > Price:</label>
                <input
                  type="text"
                  defaultValue={company.typeRoom.price}
                  readOnly
                />
              </div>

              <div className="input-row">
                <label > Number Of Beds:</label>
                <input
                  type="text"
                  defaultValue={company.typeRoom.numberOfBeds}
                  readOnly
                />
              </div>

              <div className="input-row">
                <label > Number Of People:</label>
                <input
                  type="text"
                  defaultValue={company.typeRoom.numberOfPeople}
                  readOnly
                />
              </div>

              <button className="view-button" onClick={() => {viewRoom(company)}}>
                Xem
              </button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
