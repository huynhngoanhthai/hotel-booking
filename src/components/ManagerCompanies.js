import React, { useEffect, useState } from "react";
import instance from "../utils/instance";
import "../styles/Manager.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Companies = () => {
  const [userData, setUserData] = useState(null);
  const [showForm, setShowForm] = useState(false); // Trạng thái hiển thị form
  const [nameCompany, setNameCompany] = useState("");
  const [emailCompany, setEmailCompany] = useState("");
  const [phoneCompany, setPhoneCompany] = useState("");
  const [addressCompany, setAddressCompany] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/companies");
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const viewCompany = (id) => {
    // Thực hiện hành động khi xem công ty theo ID
    console.log("View company:", id);
    navigate(`/manager/companies/${id}`);
  };

  const editCompany = (id) => {
    // Thực hiện hành động khi cập nhật công ty theo ID
    console.log("Edit company:", id);
  };

  const deleteCompany = async (id) => {
    // Thực hiện hành động khi xóa công ty theo ID
    console.log("Delete company:", id);
    try {
      await instance.delete("/companies/" + id, {
        name: nameCompany,
        email: emailCompany,
        phone: phoneCompany,
        address: addressCompany,
      });
      //   console.log(response.data);
      alert("xóa thành công");
      const updatedUserData = userData.filter((company) => company.id !== id);
      setUserData(updatedUserData);
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  const addCompany = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (event) => {
    // Xử lý submit form
    event.preventDefault();
    // TODO: Thực hiện lưu thông tin công ty
    // in ra value={emailCompany}
    // console.log(emailCompany);
    try {
      const response = await instance.post("/companies", {
        name: nameCompany,
        email: emailCompany,
        phone: phoneCompany,
        address: addressCompany,
      });
      //   console.log(response.data);
      alert("Thêm thành công");
      //   const updatedUserData = userData.filter((company) => company.id !== id);
      setUserData((prevUserData) => [...prevUserData, response.data]);
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }

    setShowForm(false); // Ẩn form sau khi lưu thông tin
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="company-list">
        {!showForm &&
          userData.map((company) => (
            <div key={company.id} className="company-item">
              <div className="input-row">
                <label>Name:</label>
                <input type="text" defaultValue={company.name} />
              </div>
              <div className="input-row">
                <label>Email:</label>
                <input type="email" defaultValue={company.email} />
              </div>
              <div className="input-row">
                <label>Phone:</label>
                <input type="tel" defaultValue={company.phone} />
              </div>
              <div className="input-row">
                <label>Address:</label>
                <input type="text" defaultValue={company.address} />
              </div>
              <button
                className="view-button"
                onClick={() => viewCompany(company.id)}
              >
                Xem
              </button>
              <button
                className="update-button"
                onClick={() => editCompany(company.id)}
              >
                Cập nhật
              </button>
              <button
                className="delete-button"
                onClick={() => deleteCompany(company.id)}
              >
                Xóa
              </button>
            </div>
          ))}
      </div>
      <div className="add-button-container">
        {!showForm ? (
          <button className="add-button" onClick={addCompany}>
            Thêm công ty
          </button>
        ) : (
          <form className="company-form" onSubmit={handleFormSubmit}>
            <div className="input-row">
              <label>Name:</label>
              <input
                value={nameCompany}
                type="text"
                onChange={(event) => setNameCompany(event.target.value)}
              />
            </div>
            <div className="input-row">
              <label>Email:</label>
              <input
                value={emailCompany}
                type="email"
                onChange={(event) => setEmailCompany(event.target.value)}
              />
            </div>
            <div className="input-row">
              <label>Phone:</label>
              <input
                value={phoneCompany}
                type="tel"
                onChange={(event) => setPhoneCompany(event.target.value)}
              />
            </div>
            <div className="input-row">
              <label>Address:</label>
              <input
                value={addressCompany}
                type="text"
                onChange={(event) => setAddressCompany(event.target.value)}
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
        )}
      </div>
    </div>
  );
};

export default Companies;
