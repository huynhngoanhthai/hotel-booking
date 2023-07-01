import React, { useEffect, useState } from "react";
import instance from "../utils/instance";
import { debounce } from "lodash";
import "../styles/Manager.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Loading from "./loading";

const Companies = () => {
  const [userData, setUserData] = useState(null);
  const [showForm, setShowForm] = useState(false); // Trạng thái hiển thị form
  const [nameCompany, setNameCompany] = useState("");
  const [emailCompany, setEmailCompany] = useState("");
  const [phoneCompany, setPhoneCompany] = useState("");
  const [addressCompany, setAddressCompany] = useState("");
  const [load, setload] = useState(false); // Trạng thái hiển thị form

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/hotels");
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const viewCompany = (company) => {
    // Thực hiện hành động khi xem công ty theo ID
    console.log("View company:", company.id);
    navigate(`/manager/hotels/${company.id}`);
  };

  const editCompany = async (company) => {
    // Thực hiện hành động khi cập nhật công ty theo ID
    console.log("Edit company:", company);
    try {
      await instance.patch("/hotels/" + company.id, {
        name: company.name,
        email: company.email,
        phone: company.phone,
        address: company.address,
      });
      // alert("Success!");
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };
  const rollBack = async (company) => {
    try {
      addCompany();
      await instance.patch("/hotels/" + company.id, {
        name: company.name,
        email: company.email,
        phone: company.phone,
        address: company.address,
      });
      console.log(company);
      setUserData([...userData]);
      // taij laij du lieu o day
      setShowForm(false);
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  // Sử dụng debounce để trì hoãn việc gọi hàm editCompany
  const debouncedEditCompany = debounce(editCompany);

  const deleteCompany = async (company) => {
    // Thực hiện hành động khi xóa công ty theo ID
    console.log("Delete company:", company.id);
    try {
      await instance.delete("/hotels/" + company.id);
      alert("Xóa thành công");
      const updatedUserData = userData.filter((c) => c.id !== company.id);
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
    try {
      const response = await instance.post("/hotels", {
        name: nameCompany,
        email: emailCompany,
        phone: phoneCompany,
        address: addressCompany,
      });
      alert("Thêm thành công");
      setUserData((prevUserData) => [...prevUserData, response.data]);
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
    setShowForm(false); // Ẩn form sau khi lưu thông tin
  };

  if (!userData) {
    return <div><Loading /></div>;
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
