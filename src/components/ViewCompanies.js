import React, { useEffect, useState } from "react";
import instance from "../utils/instance";
import "../styles/Booking.css";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Loading from "./loading";
const images = [
    require("../img/companies/c1.jpeg"),
    require("../img/companies/c2.jpeg"),
    require("../img/companies/c3.jpeg"),
    require("../img/companies/c4.jpeg"),
    require("../img/companies/c5.jpeg"),
    require("../img/companies/c6.jpeg"),
];
const ViewCompanies = () => {
    const [companiesData, setCompaniesData] = useState(null);
    const navigate = useNavigate();




    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get("/companies/" + id);
                setCompaniesData(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const delay = setTimeout(() => {
            fetchData();
        }, 100);

        return () => {
            clearTimeout(delay);
        };
    }, [id]);
    const viewHotel = (hotel) => {
        navigate(`/view-hotels/${hotel.id}`);
      };

    if (!companiesData) {
        return (
            <>
                <Loading />
            </>
        );
    }

    return (
        <div>
            <Header />
            {(
                <>
                    <div className="room-list">
                        <div className="image">
                            <img className="image-room" src={images[(id % 6)]} alt="Room" />
                        </div>
                        <div className="room-details">
                            <h2>Thông tin công ty</h2>
                            <p className="details-wrapper"><strong>ID:</strong> {companiesData.id}</p>
                            <p className="details-wrapper" ><strong>Tên:</strong> {companiesData.name}</p>
                            <p className="details-wrapper" ><strong>Email:</strong> {companiesData.email}</p>
                            <p className="details-wrapper" ><strong>Số điện thoại:</strong> {companiesData.phone}</p>
                            <p className="details-wrapper" ><strong>Địa Chỉ:</strong> {companiesData.address} </p>
                            <p className="details-wrapper" ><strong>Sở Hữu :</strong> {companiesData.hotels.length} khách sạn 🏢</p>
                        </div>
                    </div>
                    <div className="company-list">
                        {companiesData.hotels.map((company) => (
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
                                        type="email"
                                        defaultValue={company.email}
                                        readOnly
                                    />
                                </div>
                                <div className="input-row">
                                    <label>Diện Thoại:</label>
                                    <input
                                        type="tel"
                                        defaultValue={company.phone}
                                        readOnly
                                    />
                                </div>
                                <div className="input-row">
                                    <label>Địa Chỉ:</label>
                                    <input
                                        type="text"
                                        defaultValue={company.address}
                                        readOnly
                                    />
                                </div>
                                <button className="view-button" onClick={() => viewHotel(company)}>
                                    Xem
                                </button>
                            </div>
                        ))}
                    </div>
                </>

            )}
        </div>)
};

export default ViewCompanies;
