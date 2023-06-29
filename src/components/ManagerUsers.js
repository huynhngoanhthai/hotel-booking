import React, { useEffect, useState } from "react";
import instance from "../utils/instance";
// import { debounce } from "lodash";
import "../styles/Manager.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const ManagerUsers = () => {
  const [useData, setUseData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showForm] = useState(false); // Trạng thái hiển thị form
  

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/users");
        setUseData(response.data);
        const res = await instance.get("/users/me");
        setUserData(res.data)
        console.log(res.data);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    fetchData();
  }, []);

 

  // const editCompany = async (user) => {
  //   // Thực hiện hành động khi cập nhật công ty theo ID
  //   console.log("Edit company:", user);
  // };


  // Sử dụng debounce để trì hoãn việc gọi hàm editCompany
  const debouncedEditCompany = ()=>{};

  const deleteCompany = async (user) => {
    // Thực hiện hành động khi xóa công ty theo ID
    console.log("Delete user:", user.id);
    try {
      await instance.delete("/users/" + user.id);
      alert("Xóa thành công");
      const updatedUseData = useData.filter((c) => c.id !== user.id);
      setUseData(updatedUseData);
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };


  if (!useData || !userData) {
    return <div>Loading...</div>;
  }
  if (!userData.admin) {
    navigate("/home ");
  }
  return (
    <div>
      <Header />
      <div className="company-list">
        {!showForm &&
          useData.map((user) => (
            <div key={user.id} className="company-item">
              <div className="input-row">
                <label>Email:</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  onChange={(event) =>
                    debouncedEditCompany({
                      ...user,
                      email: event.target.value,
                    })
                  }
                />
              </div>
              <div className="input-row">
                <label>admin:</label>
                <select
                  defaultValue={!user.admin ? "false" : "true"}
                  onChange={(event) =>
                    debouncedEditCompany({
                      ...user,
                      admin: event.target.value,
                    })
                  }
                >
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
              <button className="delete-button" onClick={() => deleteCompany(user)}>
                Xóa
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManagerUsers;
