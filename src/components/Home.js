import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Header from "./Header";
import instance from "../utils/instance";
import { useNavigate } from "react-router-dom";
import Loading from "./loading";
import CatalogItem from "./CatalogItem";



const Home = () => {
  const [useData, setUseData] = useState(null);
  const [hotelData, setHotelData] = useState(null);
  const [companiesData, setCompaniesData] = useState(null);
  const [showCatalog, setShowCatalog] = useState(false);
  const [showCompanies, setShowCompanies] = useState(false);
  const [showHotels, setShowHotels] = useState(false);
  const [showRooms, setShowRooms] = useState(true);


  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const companies = await instance.get("/companies");
        setCompaniesData(companies.data);
        const rooms = await instance.get("/rooms");
        setUseData(rooms.data);
        const hotels = await instance.get("/hotels");
        setHotelData(hotels.data);
      } catch (error) {
        console.log(error);
      }
    };

    const delay = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => {
      clearTimeout(delay);
    };
  }, []);
  const viewRoom = (room) => {
    navigate("/manager/booking/" + room.id)
  }

  const viewHotel = async (hotel) => {
    try {
      const response = await instance.get("/hotels/" + hotel.id);
      // setUseData(response.data.rooms);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }
  const viewCompanies = async (hotel) => {
    try {
      const response = await instance.get("/Companies/" + hotel.id);
      // setUseData(response.data.rooms);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }

  const clickedCatalog = () => {
    setShowCatalog(!showCatalog);
  }
  const clickedShowCompanies = () => {
    setShowHotels(false);
    setShowCompanies(true);
    setShowRooms(false);
    console.log(showCompanies);
  }
  const clickedShowHotels = () => {
    setShowHotels(true);
    setShowCompanies(false);
    setShowRooms(false);
    

  }
  const clickedShowRooms = () => {
    setShowRooms(true);
    setShowHotels(false);
    setShowCompanies(false);
  }




  if (!useData || !hotelData || !companiesData) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <div>
      <Header />
      <div>
        <h2 style={{ cursor: "pointer" }} onClick={clickedCatalog}>Catalog</h2>
        {showCatalog && (
          <>
            <div onClick={clickedShowCompanies}><CatalogItem  title="Danh Sách Công Ty" description="Hiển thị danh sách tất cả công ty" /></div>
            <div onClick={clickedShowHotels} ><CatalogItem title="Danh Sách Khách Sạn" description="Hiển thị danh sách tất cả khạch sạn" /></div>
            <div onClick={clickedShowRooms}><CatalogItem  title="Danh Sách Phòng" description="Hiển thị danh sách tất cả phòng" /></div>
          </>)}
      </div>
      {showCompanies && !showHotels && !showRooms && <>
        <div className="company-details">
          <h2>Danh Sach Công Ty</h2>
        </div>
        <div className="company-list">
          {companiesData.map((company) => (
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

              <button className="view-button" onClick={() => { viewHotel(company) }}>
                Xem
              </button>

            </div>
          ))}
        </div>
      </>}

      {!showCompanies && showHotels && !showRooms && <>
        <div className="company-details">
          <h2>Danh Sach Hotels</h2>
        </div>
        <div className="company-list">
          {hotelData.map((company) => (
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

              <button className="view-button" onClick={() => { viewHotel(company) }}>
                Xem
              </button>

            </div>
          ))}
        </div>
      </>}

      {!showCompanies && !showHotels && showRooms && <>
        <div className="company-details">
          <h2>Danh Sach Phong</h2>
        </div>
        <div className="company-list">
          {useData.map((company) => (
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

              <button className="view-button" onClick={() => { viewRoom(company) }}>
                Xem
              </button>
            </div>
          ))}
        </div>
      </>}
    </div>
  );
};

export default Home;
