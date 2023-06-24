import React, { useEffect, useState } from "react";
import instance from "../utils/instance";
import "../styles/Manager.css";
import { debounce } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

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
  const viewCompany = (company) => {
   
  };

  const editCompany = async (company) => {
  
  };
  const rollBack = async (company) => {
  
  };

  // Sử dụng debounce để trì hoãn việc gọi hàm editCompany
  const debouncedEditCompany = debounce(editCompany);

  const deleteCompany = async (company) => {
    // Thực hiện hành động khi xóa công ty theo ID
    
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
  }, []);
  const addHotels = async() => {
    setShowForm(true);
    console.log(showForm);
  };
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="company-details">
        <h2>Company Details</h2>
          <p><strong>ID:</strong> {userData.id}</p> 
          <p><strong>Name:</strong> {userData.name}</p> 
          <p><strong>Email:</strong> {userData.email}</p> 
          <p><strong>Phone:</strong> {userData.phone}</p> 
          <p><strong>Address:</strong> {userData.address}</p> 
        <button className="view-button" onClick={addHotels}>
          thêm khách sạn
        </button>
      </div>
      <div className="company-list">
        {!showForm &&
          hotelData.map((company) => (
            <div key={company.id} className="company-item">
              <div className="input-row">
                <label>Name:</label>
                <input
                  type="text"
                  defaultValue={company.name}
                  onChange={(event) =>
                    debouncedEditCompany({
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
                    debouncedEditCompany({
                      ...company,
                      email: event.target.value,
                    })
                  }
                />
              </div>
              <div className="input-row">
                <label>Phone:</label>
                <input
                  type="tel"
                  defaultValue={company.phone}
                  onChange={(event) =>
                    debouncedEditCompany({
                      ...company,
                      phone: event.target.value,
                    })
                  }
                />
              </div>
              <div className="input-row">
                <label>Address:</label>
                <input
                  type="text"
                  defaultValue={company.address}
                  onChange={(event) =>
                    debouncedEditCompany({
                      ...company,
                      address: event.target.value,
                    })
                  }
                />
              </div>
              <button className="view-button" onClick={() => viewCompany(company)}>
                Xem
              </button>
              <button className="update-button" onClick={() => rollBack(company)}>
                hoàn lại
              </button>
              <button className="delete-button" onClick={() => deleteCompany(company)}>
                Xóa
              </button>
            </div>
          ))}
      </div>
      {showForm && (
        <div className="company-list">
          <form className="company-item" onSubmit={handleFormSubmit}>
            <div className="input-row">
              <label>Name:</label>
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
              <label>Phone:</label>
              <input
                value={phoneHotel}
                type="tel"
                onChange={(event) => setPhoneHotel(event.target.value)}
              />
            </div>
            <div className="input-row">
              <label>Address:</label>
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
              onClick={() => setShowForm(false)}
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
