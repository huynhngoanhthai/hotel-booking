import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Header from "./Header";
import instance from "../utils/instance";
import { useNavigate } from "react-router-dom";
import Loading from "./loading";
import CatalogItem from "./CatalogItem";
import Search from "./search";



const Home = () => {
  const [useData, setUseData] = useState(null);

  const [hotelData, setHotelData] = useState(null);
  const [companiesData, setCompaniesData] = useState(null);

  const [hotelDataOrigin, setHotelDataOrigin] = useState(null);
  const [companiesDataOrigin, setCompaniesDataOrigin] = useState(null);
  const [useDataOrigin, setUseDataOrigin] = useState(null);

  const [showCatalog, setShowCatalog] = useState(false);
  const [showCompanies, setShowCompanies] = useState(false);
  const [showHotels, setShowHotels] = useState(true);
  const [showRooms, setShowRooms] = useState(false);
  const [contentCompanies, setContentCompanies] = useState("");
  const [contentHotels, setContentHotels] = useState("");
  const [contentRooms, setContentRooms] = useState("");



  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const companies = await instance.get("/companies");
        setCompaniesData(companies.data);
        setCompaniesDataOrigin(companies.data);
        const rooms = await instance.get("/rooms");
        setUseData(rooms.data);
        setUseDataOrigin(rooms.data)
        const hotels = await instance.get("/hotels");
        setHotelData(hotels.data);
        setHotelDataOrigin(hotels.data);
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
      navigate("/view-hotels/" + hotel.id);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }
  const viewCompanies = async (companies) => {
    try {
      navigate("/view-companies/" + companies.id);
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
    setShowCatalog(false);
    setCompaniesData(companiesDataOrigin);
    // console.log(showCompanies);
  }
  const clickedShowHotels = () => {
    setShowHotels(true);
    setShowCompanies(false);
    setShowRooms(false);
    setShowCatalog(false);
    setHotelData(hotelDataOrigin);
  }
  const clickedShowRooms = () => {
    setShowRooms(true);
    setShowHotels(false);
    setShowCompanies(false);
    setShowCatalog(false);
    setUseDataOrigin(useDataOrigin);

  }


  const optionSuggestHotels1 = () => {
    const filteredData = hotelDataOrigin.filter((item) =>
      item.typeRooms.filter((item) => item.price <= 100).length == 0 ? false : true
    );
    console.log(filteredData);
    setHotelData(filteredData);
  }
  const optionSuggestHotels2 = () => {
    const filteredData = hotelDataOrigin.filter((item) =>
      item.typeRooms.filter((item) => item.price > 100 && item.price <= 200).length == 0 ? false : true
    );
    setHotelData(filteredData);
  }
  const optionSuggestHotels3 = () => {

    const filteredData = hotelDataOrigin.filter((item) =>
      item.typeRooms.filter((item) => item.price > 200 && item.price <= 300).length == 0 ? false : true
    );

    setHotelData(filteredData);
  }
  const optionSuggestHotels4 = () => {
    const filteredData = hotelDataOrigin.filter((item) =>
      item.typeRooms.filter((item) => item.price > 300).length == 0 ? false : true
    );
    setHotelData(filteredData);
  }

  const optionSuggest1 = () => {
    const filteredData = useDataOrigin.filter((item) =>
      item.typeRoom.price <= 100
    );
    setUseData(filteredData);
  }
  const optionSuggest2 = () => {
    const filteredData = useDataOrigin.filter((item) =>
      item.typeRoom.price > 100 && item.typeRoom.price <= 200
    );
    setUseData(filteredData);
  }
  const optionSuggest3 = () => {
    const filteredData = useDataOrigin.filter((item) =>
      item.typeRoom.price > 200 && item.typeRoom.price <= 300
    );
    setUseData(filteredData);
  }
  const optionSuggest4 = () => {
    const filteredData = useDataOrigin.filter((item) =>
      item.typeRoom.price > 300
    );
    setUseData(filteredData);
  }


  const searchCompanies = (content) => {
    if (content === "")
      return setCompaniesData(companiesDataOrigin);
    console.log(content);
    const filteredData = companiesData.filter((item) =>
      item.name.toLowerCase().includes(content.toLowerCase()) || item.address.toLowerCase().includes(content.toLowerCase())
    );
    setCompaniesData(filteredData);
  }

  const searchHotels = (content) => {
    if (content === "")
      return setHotelData(hotelDataOrigin);
    console.log(content);
    const filteredData = hotelData.filter((item) =>
      item.name.toLowerCase().includes(content.toLowerCase()) || item.address.toLowerCase().includes(content.toLowerCase())
    );
    setHotelData(filteredData);

  }
  const searchRooms = (content) => {
    console.log(content);
    if (content === "")
      return setUseData(useDataOrigin);
    const filteredData = useData.filter((item) =>
      item.name.toLowerCase().includes(content.toLowerCase())
    );
    setUseData(filteredData);

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
        <div style={{ cursor: "pointer" }} onClick={clickedCatalog}>
          <h2 style={{ cursor: "pointer" }} >MENU</h2>
        </div>

        {showCatalog && (
          <>
            <div onClick={clickedShowCompanies}><CatalogItem title="Danh Sách Công Ty" description="Hiển thị danh sách tất cả công ty" /></div>
            <div onClick={clickedShowHotels} ><CatalogItem title="Danh Sách Khách Sạn" description="Hiển thị danh sách tất cả khạch sạn" /></div>
            <div onClick={clickedShowRooms}><CatalogItem title="Danh Sách Phòng" description="Hiển thị danh sách tất cả phòng" /></div>
          </>)}
      </div>

      {showCompanies && !showHotels && !showRooms && <>
        <div className="InputContainer">
          <input
            placeholder="Search Companies..."
            id="input"
            className="input"
            name="text"
            type="text"
            value={contentCompanies}
            onChange={(event) => setContentCompanies(event.target.value)}
            onKeyDown={(event) => event.keyCode === 13 ? searchCompanies(contentCompanies) : undefined}
          />
        </div>
        <div className="company-details">

          <h2>Danh Sách Công Ty</h2>
        </div>
        <div className="company-list">
          {companiesData.map((company) => (
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
                <label>Email:</label>
                <input
                  type="text"
                  defaultValue={company.email}
                  readOnly
                />
              </div>
              <div className="input-row">
                <label>Điện thoại:</label>
                <input
                  type="text"
                  defaultValue={company.phone}
                  readOnly
                />
              </div>
              <div className="input-row">
                <label>Địa chỉ:</label>
                <input
                  type="text"
                  defaultValue={company.address}
                  readOnly
                />
              </div>

              <button className="view-button" onClick={() => { viewCompanies(company) }}>
                Xem
              </button>

            </div>
          ))}
        </div>
      </>}

      {!showCompanies && showHotels && !showRooms && <>
        <div className="InputContainer">
          <input
            placeholder="Search Hotels..."
            id="input"
            className="input"
            name="text"
            type="text"
            value={contentHotels}
            onChange={(event) => setContentHotels(event.target.value)}
            onKeyDown={(event) => event.keyCode === 13 ? searchHotels(contentHotels) : undefined}
          />
        </div>
        <button class="btn" onClick={optionSuggestHotels1}> dưới 100$
        </button>
        <button class="btn" onClick={optionSuggestHotels2}> từ 100$ - 200$
        </button>
        <button class="btn" onClick={optionSuggestHotels3}> từ 200$ - 300$
        </button>
        <button class="btn" onClick={optionSuggestHotels4}> Trên 300$
        </button>

        <div className="company-details">
          <h2>Danh Sách Hotels</h2>
        </div>
        <div className="company-list">
          {hotelData.map((company) => (
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
                <label>Email:</label>
                <input
                  type="text"
                  defaultValue={company.email}
                  readOnly
                />
              </div>
              <div className="input-row">
                <label>Điện Thoại:</label>
                <input
                  type="text"
                  defaultValue={company.phone}
                  readOnly
                />
              </div>
              <div className="input-row">
                <label>Địa chỉ:</label>
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
        <div className="InputContainer">
          <input
            placeholder="Search Rooms..."
            id="input"
            className="input"
            name="text"
            type="text"
            value={contentRooms}
            onChange={(event) => setContentRooms(event.target.value)}
            onKeyDown={(event) => event.keyCode === 13 ? searchRooms(contentRooms) : undefined}
          />
        </div>

        <button class="btn" onClick={optionSuggest1}> dưới 100$
        </button>
        <button class="btn" onClick={optionSuggest2}> từ 100$ - 200$
        </button>
        <button class="btn" onClick={optionSuggest3}> từ 200$ - 300$
        </button>
        <button class="btn" onClick={optionSuggest4}> Trên 300$
        </button>

        <div className="company-details">
          <h2>Danh Sách Phòng</h2>
        </div>
        <div className="company-list">
          {useData.map((company) => (
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
                <label > Tầng:</label>
                <input
                  type="text"
                  defaultValue={company.floor}
                  readOnly
                />
              </div>

              <div className="input-row">
                <label > Trạng Thái Phòng:</label>
                <input
                  type="text"
                  defaultValue={company.status ? 'Phòng Trống' : 'Hết Phòng'}
                  readOnly
                />
              </div>
              <div className="input-row">
                <label > Loại Phòng:</label>
                <input
                  type="text"
                  defaultValue={company.typeRoom.name}
                  readOnly
                />
              </div>

              <div className="input-row">
                <label > Giá:</label>
                <input
                  type="text"
                  defaultValue={company.typeRoom.price}
                  readOnly
                />
              </div>

              <div className="input-row">
                <label > Số Giường Ngủ:</label>
                <input
                  type="text"
                  defaultValue={company.typeRoom.numberOfBeds}
                  readOnly
                />
              </div>

              <div className="input-row">
                <label > Số Người ở:</label>
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
