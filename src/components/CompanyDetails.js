import React, { useEffect, useState } from "react";
import instance from "../utils/instance";
import "../styles/Manager.css";
import { debounce } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Loading from "./loading";

const CompanyDetails = () => {
  const [userData, setUserData] = useState(null);
  const [hotelData, setHotelData] = useState(null);
  const [showForm, setShowForm] = useState(false); // Trạng thái hiển thị form
  const [nameHotel, setNameHotel] = useState("");
  const [emailHotel, setEmailHotel] = useState("");
  const [phoneHotel, setPhoneHotel] = useState("");
  const [addressHotel, setAddressHotel] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  ///
  const viewHotel = (hotel) => {
    navigate(`/manager/hotel/${hotel.id}`);
  };

  const editHotel = async (hotel) => {
     // Thực hiện hành động khi cập nhật công ty theo ID 
     console.log("Edit company:", hotel);
     try {
       await instance.patch("/hotels/" + hotel.id, {
         name: hotel.name,
         email: hotel.email,
         phone: hotel.phone,
         address: hotel.address,
       });
     } catch (error) {
       console.log(error.response.data.message);
       alert(error.response.data.message);
     }
  
  };
  const rollBack = async (hotel) => {
    try {
      addHotels();
      await instance.patch("/hotels/" + hotel.id, {
        name: hotel.name,
        email: hotel.email,
        phone: hotel.phone,
        address: hotel.address,
      });
      console.log(hotel);
      cannelAddHotel();
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  
  };

  // Sử dụng debounce để trì hoãn việc gọi hàm editHotel
  const debouncedEditHotel = debounce(editHotel);

  const deleteHotel = async (hotel) => {
    // Thực hiện hành động khi xóa công ty theo ID
   
    try {
      await instance.delete("/hotels/" + hotel.id);
      alert("Xóa thành công");
      const updateData = hotelData.filter((c) => c.id !== hotel.id);
      setHotelData(updateData);
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
    
  };

  ///
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/companies/" + id);
        // const listHotel = await instance.get("/hotels/" + response.data.)
        setUserData(response.data);
        setHotelData(response.data.hotels)
        console.log(response.data.hotels);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  },[id]);
  const addHotels = async() => {
    setShowForm(true);
    console.log(showForm);
  };
  const cannelAddHotel = () =>{
    setShowForm(false);
    setHotelData([...hotelData])
   
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await instance.post("/hotels",{
        name: nameHotel,
        email: emailHotel,
        phone: phoneHotel,
        address: addressHotel,
        companyId:id
      });
      alert("Thêm thành công");
      setHotelData((prevUserData) => [...prevUserData, response.data]);
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
      
    }
    setShowForm(false); 
  };

  if (!userData) {
    return <div><Loading /></div>;
  }

  return (
    <div>
      <Header />
      <div className="company-details">
        <h2>Thông Tin Chi Tiết Công Ty</h2>
          <p><strong>ID:</strong> {userData.id}</p> 
          <p><strong>Tên:</strong> {userData.name}</p> 
          <p><strong>Email:</strong> {userData.email}</p> 
          <p><strong>Điện Thoại:</strong> {userData.phone}</p> 
          <p><strong>Địa Chỉ:</strong> {userData.address}</p> 
        <button className="view-button" onClick={addHotels}>
          thêm khách sạn
        </button>
      </div>
      <div className="company-list">
        {!showForm &&
          hotelData.map((company) => (
            <div key={company.id} className="company-item">
              <div className="input-row">
                <label>Tên:</label>
                <input
                  type="text"
                  defaultValue={company.name}
                  onChange={(event) =>
                    debouncedEditHotel({
                      ...company,
                      name: event.target.value,
                    })
                  }
                />
              </div>
              <div className="input-row">
                <label>Email:</label>
                <input
                  type="email"
                  defaultValue={company.email}
                  onChange={(event) =>
                    debouncedEditHotel({
                      ...company,
                      email: event.target.value,
                    })
                  }
                />
              </div>
              <div className="input-row">
                <label>Điện Thoại:</label>
                <input
                  type="tel"
                  defaultValue={company.phone}
                  onChange={(event) =>
                    debouncedEditHotel({
                      ...company,
                      phone: event.target.value,
                    })
                  }
                />
              </div>
              <div className="input-row">
                <label>Địa Chỉ:</label>
                <input
                  type="text"
                  defaultValue={company.address}
                  onChange={(event) =>
                    debouncedEditHotel({
                      ...company,
                      address: event.target.value,
                    })
                  }
                />
              </div>
              <button className="view-button" onClick={() => viewHotel(company)}>
                Xem
              </button>
              <button className="update-button" onClick={() => rollBack(company)}>
                hoàn lại
              </button>
              <button className="delete-button" onClick={() => deleteHotel(company)}>
                Xóa
              </button>
            </div>
          ))
          }
      </div>
      {showForm && (
        <div className="company-list">
          <form className="company-item" onSubmit={handleFormSubmit}>
            <div className="input-row">
              <label>Tên:</label>
              <input
                value={nameHotel}
                type="text"
                onChange={(event) => setNameHotel(event.target.value)}
              />
            </div>
            <div className="input-row">
              <label>Email:</label>
              <input
                value={emailHotel}
                type="email"
                onChange={(event) => setEmailHotel(event.target.value)}
              />
            </div>
            <div className="input-row">
              <label>Điện Thoại:</label>
              <input
                value={phoneHotel}
                type="tel"
                onChange={(event) => setPhoneHotel(event.target.value)}
              />
            </div>
            <div className="input-row">
              <label>Địa Chỉ:</label>
              <input
                value={addressHotel}
                type="text"
                onChange={(event) => setAddressHotel(event.target.value)}
              />
            </div>
            <button type="submit" className="update-button">
              Lưu
            </button>
            <button
              type="button"
              className="delete-button"
              onClick={cannelAddHotel}
            >
              Hủy
            </button>
          </form>
        </div>
        )}
      </div>
      

  );
};

export default CompanyDetails;
