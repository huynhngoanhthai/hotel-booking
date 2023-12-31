import React, { useEffect } from "react";
import "./App.css";
import Login from "./components/Login";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import { AuthProvider } from "./Context/GlobalContext";
import Profile from "./components/Profile";
import Manager from "./components/Manager";
import instance from "./utils/instance";
import Companies from "./components/ManagerCompanies";
import CompanyDetails from "./components/CompanyDetails";
import HotelDetails from "./components/HotelDetails";
import RoomDetails from "./components/RoomDetails";
import Booking from "./components/Booking";
import HistoryBooking from "./components/historyBooking";
import ManagerUsers from "./components/ManagerUsers";
import BookingDetails from "./components/BookingDetails";
import ViewCompanies from "./components/ViewCompanies";
import ViewHotels from "./components/ViewHotels";

const checkLogin = async () => {
  try {
    const response = await instance.get("/users/me");
    if (response?.status === 200) return true;
  } catch (error) {
    return false;
  }
};

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkUserLogin = async () => {
      const loggedIn = await checkLogin();
      if (!loggedIn) {
        navigate("/login");
      }
    };
    checkUserLogin();
  }, []); // eslint-disable-next-line

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/manager" element={<Manager></Manager>}></Route>
        <Route path="/history-booking" element={<HistoryBooking />} />
        <Route path="/manager/booking/:id" element={<Booking />} />
        <Route path="/view-companies/:id" element={<ViewCompanies />} />
        <Route path="/view-hotels/:id" element={<ViewHotels />} />


        <Route path="/manager/BookingDetails/:id" element={<BookingDetails />} />
        <Route path="/manager/companies" element={<Companies></Companies>}>
          {/* Chuyển hướng tới "/login" cho "/manager/companies" */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
        <Route path="/manager/companies/:id" element={<CompanyDetails />} />
        <Route path="/manager/hotel/:id" element={<HotelDetails />} />
        <Route path="/manager/room/:id" element={<RoomDetails />} />
        <Route path="/manager/users" element={<ManagerUsers/>}/>
        <Route path="/manager/*" element={<Companies></Companies>}>
          {/* Chuyển hướng tới "/login" cho "/manager/*" */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
