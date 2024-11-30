import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const location = window.location.pathname;
  const [activeItem, setActiveItem] = useState("Home");

  useEffect(() => {
    switch (location) {
      case "/":
        setActiveItem("Home");
        break;
      case "/venue.html":
        setActiveItem("Venue");
        break;
      case "/booking.html":
        setActiveItem("Booking");
        break;
      case "/customer.html":
        setActiveItem("Customer");
        break;
      case "/payment.html":
        setActiveItem("Payment");
        break;
      case "/feedback.html":
        setActiveItem("Feedback");
        break;
      case "/complaints.html":
        setActiveItem("Complaints");
        break;

      default:
        setActiveItem("Home");
        break;
    }
  }, [location]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/logout");
      window.location.reload(false);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <>
      <div id="sidebar" className="sidebar pe-4 pb-3">
        <nav className="navbar bg-light navbar-ligh">
          <Link to="/" className="navbar-brand mx-4 mb-3">
            <h3 className="text-primary">
              <i className="fa fa-star me-2" />
              Venue Vista
            </h3>
          </Link>
          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <img
                className="rounded-circle "
                src="/assests/img/admin.jpg"
                alt=""
                style={{ width: 40, height: 40 }}
              />
              <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1" />
            </div>
            <div className="ms-3">
              <h6 className="mb-0">Admin</h6>
              <span>Admin</span>
            </div>
          </div>
          <div className="navbar-nav w-100">
            <Link to="/" className={`nav-item nav-link ${activeItem === "Home" ? "active" : ""}`}>
              <i className="fa fa-tachometer-alt me-2" />
              Dashboard
            </Link>

            <div className="nav-item dropdown ">
              <Link to="../venue.html" className={`nav-item nav-link ${activeItem === "Venue" ? "active" : ""}`}>
                <i className="fa fa-th me-2" />
                Venue
              </Link>
              <Link to="../customer.html" className={`nav-item nav-link ${activeItem === "Customer" ? "active" : ""}`}>
                <i className="fa fa-th me-2" />
                Customer
              </Link>
              <Link to="../booking.html" className={`nav-item nav-link ${activeItem === "Booking" ? "active" : ""}`}>
                <i className="fa fa-th me-2" />
                Booking
              </Link>
              <Link to="../payment.html" className={`nav-item nav-link ${activeItem === "Payment" ? "active" : ""}`}>
                <i className="fa fa-th me-2" />
                Payment
              </Link>
              <Link to="../feedback.html" className={`nav-item nav-link ${activeItem === "Feedback" ? "active" : ""}`}>
                <i className="fa fa-th me-2" />
                Feedback
              </Link>
              <Link to="../complaints.html" className={`nav-item nav-link ${activeItem === "Complaints" ? "active" : ""}`}>
                <i className="fa fa-th me-2" />
                Complaints
              </Link>
              <Link onClick={(e) => handleLogout(e)} className={`nav-item nav-link`}>
                <i className="fa fa-th me-2" />
                Logout
              </Link>
            </div>
          </div>
        </nav>
      </div>
      {/* Sidebar End */}
    </>
  );
}
export default Sidebar;
