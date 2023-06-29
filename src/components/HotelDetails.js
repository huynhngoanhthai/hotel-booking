import React, { useEffect, useState } from "react";
import instance from "../utils/instance";
import "../styles/Manager.css";
import { debounce } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { FaTrash } from "react-icons/fa";

const CompanyDetails = () => {
  const [roomData, setRoomData] = useState(null);
  const [hotelData, setHotelData] = useState(null);
  const [typeRoomData, setTypeRoomData] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [userData, setUserData] = useState(null);

  const [showForm, setShowForm] = useState(false); // Trạng thái hiển thị form
  const [showFormAddtypeRoom, setShowFormAddtypeRoom] = useState(false);
  const [nameRoom, setNameRoom] = useState("");
  const [floorRoom, setFloorRoom] = useState("");
  const [statusRoom, setStatusRoom] = useState(true);
  const [typeRoomIndex, setTypeRoomIndex] = useState(1);

  const [nameTypeRoom, setNameTypeRoom] = useState("");
  const [priceTypeRoom, setPriceTypeRoom] = useState("");
  const [numberOfPeopleTypeRoom, setNumberOfPeopleTypeRoom] = useState("");
  const [numberOfBedsTypeRoom, setNumberOfBedsTypeRoom] = useState("");




  //   const [addressHotel, setAddressHotel] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  ///


  ///
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/hotels/" + id);
        setHotelData(response.data);
        setRoomData(response.data.rooms);
        setTypeRoomData(response.data.typeRooms);
        setCommentData(response.data.comments.slice().sort((a, b) => a.id - b.id));
        const res = await instance.get("users/me");
        setUserData(res.data);
        console.log(response.data.typeRooms);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  const viewRoom = (room) => {
    navigate(`/manager/room/${room.id}`);
  }

  const deleteRoom = async (room) => {
    try {
      await instance.delete("/rooms/" + room.id);
      alert("Xóa thành công");
      const updateData = roomData.filter((c) => c.id !== room.id);
      setRoomData(updateData);
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }


  }
  const deleteTypeRoom = async (typeRoom) => {
    try {
      await instance.delete("/type-rooms/" + typeRoom.id);
      alert("Xóa thành công");
      const updateData = typeRoomData.filter((c) => c.id !== typeRoom.id);
      setTypeRoomData(updateData);
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  }
  const addRoom = async () => {
    setShowForm(true);
    cannelTypeRoom();
    // console.log(showForm);
  };
  const cannelAddRoom = () => {
    setShowForm(false);
    setRoomData([...roomData])
  }
  const rollBack = async (room) => {
    try {
      addRoom();
      await instance.patch("/rooms/" + room.id, {
        name: room.name,
        floor: room.floor,
        status: room.status,
        typeRoomId: room.typeRoom.id.toString(),
        hotelId: id.toString()
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
    setShowForm(false);
  }
  const rollBackTypeRoom = async (room) => {
    try {
      addRoom();
      console.log(room);
      await instance.patch("/type-rooms/" + room.id, {
        name: room.name,
        price: +room.price,
        numberOfPeople: +room.numberOfPeople,
        numberOfBeds: +room.numberOfBeds,
        hotelId: id.toString()
      });
      cannelAddRoom();
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log();
    try {
      const response = await instance.post("/rooms", {
        name: nameRoom,
        floor: +floorRoom,
        status: statusRoom === "true" ? true : false,
        hotelId: id.toString(),
        typeRoomId: typeRoomData[typeRoomIndex - 1].id.toString()
      });
      alert("them thanh cong");
      setRoomData((prevUserData) => [...prevUserData, response.data]);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
    setShowForm(false);
  }
  const handleFormSubmitAddNewTypeRoom = async (event) => {
    event.preventDefault();
    try {
      const response = await instance.post("/type-rooms", {
        name: nameTypeRoom,
        price: +priceTypeRoom,
        numberOfPeople: +numberOfPeopleTypeRoom,
        numberOfBeds: +numberOfBedsTypeRoom,
        hotelId: id.toString()
      });
      alert("them thanh cong");
      setTypeRoomData((prevUserData) => [...prevUserData, response.data]);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
    cannelTypeRoom(false);
  }

  const editTypeRoom = async (room) => {
    console.log("Edit room:", room);
    try {
      const response = await instance.patch("/type-rooms/" + room.id, {
        name: room.name,
        price: +room.price,
        numberOfPeople: +room.numberOfPeople,
        numberOfBeds: +room.numberOfBeds,
        hotelId: id.toString()
      });
      const updateData = typeRoomData.map(c => c.id === room.id ? response.data : c);
      setTypeRoomData([...updateData, response.data]);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }

  }
  const editRoom = async (room) => {

    try {
      await instance.patch("/rooms/" + room.id, {
        name: room.name,
        floor: room.floor,
        status: room.status === "true" ? true : false,
        typeRoomId: room.typeRoom.id.toString(),
        hotelId: id.toString(),

      });
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }

  }
  const debouncedEditRoom = debounce(editRoom);
  const debouncedEditTypeRoom = debounce(editTypeRoom);

  const addTypeRoom = () => {
    setShowFormAddtypeRoom(true);
    cannelAddRoom();
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

  const cannelTypeRoom = () => {
    setShowFormAddtypeRoom(false);
  };

  if (!hotelData || !userData) {
    return <div>Loading...</div>;
  };
  if (!userData.admin) {
    navigate("/home");
  }
  return (
    <div>
      <Header />
      <div className="company-details">
        <h2>Hotel Details</h2>
        <p><strong>ID:</strong> {hotelData.id}</p>
        <p><strong>Name:</strong> {hotelData.name}</p>
        <p><strong>Email:</strong> {hotelData.email}</p>
        <p><strong>Phone:</strong> {hotelData.phone}</p>
        <p><strong>Address:</strong> {hotelData.address}</p>
        <button className="view-button" onClick={addRoom}>
          thêm phòng
        </button>
        <button className="view-button" onClick={addTypeRoom}>
          thêm loại phòng
        </button>
      </div>

      {commentData.length !== 0 &&
        <div className="company-details">
          <h2>Comments Hotel</h2>
          <ul className="comment-item">
            {commentData.slice(-10).map(comment => (
              <div className="comment-wrapper">
                <li key={comment.id}>{comment.content}</li>{
                  <FaTrash className="delete-icon" onClick={() => deleteComment(comment.id)} />}
              </div>
            ))}
          </ul>
        </div>
      }
      <div className="company-list">
        {!showFormAddtypeRoom && !showForm &&
          roomData.map((company) => (
            <div key={company.id} className="company-item">
              <div className="input-row">
                <label>Name:</label>
                <input
                  type="text"
                  defaultValue={company.name}
                  onChange={(event) =>
                    debouncedEditRoom({
                      ...company,
                      name: event.target.value,
                    })
                  }
                />
              </div>
              <div className="input-row">
                <label>Floor:</label>
                <input
                  defaultValue={company.floor}
                  onChange={(event) =>
                    debouncedEditRoom({
                      ...company,
                      floor: event.target.value,
                    })
                  }
                />
              </div>
              <div className="input-row">
                <label>Status:</label>
                <select
                  defaultValue={!company.status ? "false" : "true"}
                  onChange={(event) =>
                    debouncedEditRoom({
                      ...company,
                      status: event.target.value,
                    })
                  }
                >
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
              <div className="input-row">
                <label>Type Room:</label>
                <select
                  defaultValue={company.typeRoom.name}
                  onChange={(event) =>
                    debouncedEditRoom({
                      ...company,
                      typeRoomId: event.target.value,
                    })
                  }
                >
                  {typeRoomData.map((room) => (
                    <option key={room.id} value={room.name}>
                      {room.name}
                    </option>
                  ))}
                </select>

              </div>
              <button className="view-button" onClick={() => viewRoom(company)}>
                Xem
              </button>
              <button className="update-button" onClick={() => rollBack(company)}>
                hoàn lại
              </button>
              <button className="delete-button" onClick={() => deleteRoom(company)}>
                Xóa
              </button>
            </div>
          ))}
      </div>
      <div className="company-details">
        <h2>Danh Sach Loai Phong</h2>
      </div>
      <div className="company-list">
        {!showFormAddtypeRoom && !showForm &&
          typeRoomData.map((company) => (
            <div key={company.id} className="company-item">
              <div className="input-row">
                <label>Name:</label>
                <input
                  type="text"
                  defaultValue={company.name}
                  onChange={(event) =>
                    debouncedEditTypeRoom({
                      ...company,
                      name: event.target.value,
                    })
                  }
                />
              </div>
              <div className="input-row">
                <label>price:</label>
                <input
                  type="number"
                  defaultValue={company.price}
                  onChange={(event) =>
                    debouncedEditTypeRoom({
                      ...company,
                      price: event.target.value,
                    })
                  }
                />
              </div>
              <div className="input-row">
                <label>Number Of People:</label>
                <input
                  type="number"
                  defaultValue={company.numberOfPeople}
                  onChange={(event) =>
                    debouncedEditTypeRoom({
                      ...company,
                      numberOfPeople: event.target.value,
                    })
                  }

                />
              </div>
              <div className="input-row">
                <label>Number Of Beds:</label>
                <input
                  type="number"
                  defaultValue={company.numberOfBeds}
                  onChange={(event) =>
                    debouncedEditTypeRoom({
                      ...company,
                      numberOfBeds: event.target.value,
                    })
                  }


                />
              </div>
              <button className="update-button" onClick={() => rollBackTypeRoom(company)}>
                hoàn lại
              </button>
              <button className="delete-button" onClick={() => deleteTypeRoom(company)}>
                Xóa
              </button>
            </div>
          ))}
      </div>

      {!showFormAddtypeRoom && showForm && (
        <div className="company-list">
          <form className="company-item" onSubmit={handleFormSubmit}>
            <div className="input-row">
              <label>Name:</label>
              <input
                value={nameRoom}
                type="text"
                onChange={(event) => setNameRoom(event.target.value)}
              />
            </div>
            <div className="input-row">
              <label>Floor:</label>
              <input
                value={floorRoom}
                onChange={(event) => setFloorRoom(event.target.value)}
              />
            </div>
            <div className="input-row">
              <label>Status:</label>
              <select
                value={statusRoom}
                onChange={(event) => setStatusRoom(event.target.value)}
              >
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </div>
            <div className="input-row">
              <label>Type Room:</label>
              <select
                value={typeRoomIndex}
                onChange={(event) => setTypeRoomIndex(event.target.value)}
              >
                {typeRoomData.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="update-button">
              Lưu
            </button>
            <button
              type="button"
              className="delete-button"
              onClick={cannelAddRoom}
            >
              Hủy
            </button>
          </form>
        </div>
      )}

      {showFormAddtypeRoom && !showForm && (
        <div className="company-list">
          <form className="company-item" onSubmit={handleFormSubmitAddNewTypeRoom}>
            <div className="input-row">
              <label>Name:</label>
              <input
                value={nameTypeRoom}
                type="text"
                onChange={(event) => setNameTypeRoom(event.target.value)}
              />
            </div>
            <div className="input-row">
              <label>price:</label>
              <input
                type="number"
                value={priceTypeRoom}
                onChange={(event) => setPriceTypeRoom(event.target.value)}
              />
            </div>
            <div className="input-row">
              <label>Number Of People:</label>
              <input
                type="number"
                value={numberOfPeopleTypeRoom}
                onChange={(event) => setNumberOfPeopleTypeRoom(event.target.value)}

              />
            </div>
            <div className="input-row">
              <label>Number Of Beds:</label>
              <input
                type="number"
                value={numberOfBedsTypeRoom}
                onChange={(event) => setNumberOfBedsTypeRoom(event.target.value)}
              />
            </div>
            <button type="submit" className="update-button">
              Lưu
            </button>
            <button
              type="button"
              className="delete-button"
              onClick={cannelTypeRoom}
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
