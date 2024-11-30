import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { CDBDataTable } from "cdbreact";

function Dashboard() {
  const [counts, setCounts] = useState({});
  const [datas, setDatas] = useState([]);
  const [complaintsData, setComplaintsData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  //!time ago code
  const timeAgo = (timestamp) => {
    const ISTOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const current = new Date(Date.now() + ISTOffset);
    const previous =
      typeof timestamp === "string" ? new Date(timestamp) : timestamp;
    const elapsed = current - previous;

    const seconds = Math.floor(elapsed / 1000);

    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }

    const days = Math.floor(hours / 24);

    if (days < 7) {
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }

    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  };

  useEffect(() => {
    axios
      .post(
        "http://localhost:8000/api/admin/view_counts",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setCounts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // .then(() => setLoaded(true))

    axios
      .post(
        "http://localhost:8000/api/admin/view_complaints",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setComplaintsData(response.data.complaints);
      })
      .then(() => setLoaded(true))
      .catch((error) => {
        console.log(error);
      });
    // .then(() => setLoaded(true))

    axios
      .post(
        "http://localhost:8000/api/admin/view_venue_bookings",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setDatas(response.data);
      })
      .then(() => setLoaded(true))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formattedSensorData =
    datas.bookings?.length > 0
      ? datas.bookings.map((book) => ({
          "Customer Name": book.userName,
          "Venue Name": book.venueName,
          "Payment Amount": parseInt(book.paymentAmount),
          "From Date": book.fromDate,
          "To Date": book.toDate,
        }))
      : [];

  if (formattedSensorData.length === 0) {
    return null; // Return nothing if there is no sensor data
  }

  return (
    <>
      {/* Spinner Start */}
      <div
        id="spinner"
        className={`${
          isLoaded ? "" : "show"
        } bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center `}
      >
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <Sidebar />
      <div id="content" className="content">
        <Navbar />
        {/* Navbar End */}
        {/* Sale & Revenue Start */}
        <div className="container-fluid pt-4 px-4">
          <div className="row g-3">
            <div className="col-sm-6 col-xl-4">
              <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-chart-line fa-3x text-primary" />
                <div className="ms-3">
                  <p className="mb-2">Today Bookings</p>
                  <h6 className="mb-0">{counts.todayBookings}</h6>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-4">
              <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-chart-bar fa-3x text-primary" />
                <div className="ms-3">
                  <p className="mb-2">Total Bookings</p>
                  <h6 className="mb-0">{counts.totalBookings}</h6>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-4">
              <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-chart-area fa-3x text-primary" />
                <div className="ms-3">
                  <p className="mb-2">Total Revenue</p>
                  <h6 className="mb-0">{"₹ " + counts.totalRevenue}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Recent Sales Start */}
        <div className="container-fluid pt-4 px-4">
          <div className="bg-light text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Recent Booking</h6>
              <a href>Show All</a>
            </div>
            <div className="table-responsive">
              <CDBDataTable
                paginationLabel={["Previous", "Next"]}
                striped
                btn={true}
                exportToCSV={true}
                sortable
                bordered
                tbodyTextWhite
                tbodyColor="red"
                hover
                entriesOptions={[5, 20, 25]}
                entries={5}
                pagesAmount={4}
                data={{
                  columns: Object.keys(formattedSensorData[0] || {}).map(
                    (key) => ({
                      label: key,
                      field: key,
                    })
                  ),
                  rows: formattedSensorData,
                }}
              />
            </div>
          </div>
        </div>
        {/* Recent Sales End */}
        {/* Widgets Start */}
        <div className="container-fluid pt-4 px-4">
          <div className="row g-">
            <div className="col-sm-12 col-md- col-xl-">
              <div className="h-100 bg-light rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h6 className="mb-0">Complaints</h6>
                  <a href>Show All</a>
                </div>
                {complaintsData.map((item, i) => (
                  <>
                    <div className="d-flex align-items-center border-bottom py-3">
                      <img
                        className="rounded-circle flex-shrink-0"
                        src="/assests/img/admin.jpg"
                        alt=""
                        style={{ width: 40, height: 40 }}
                      />
                      <div className="w-100 ms-3">
                        <div className="d-flex w-100 justify-content-between">
                          <h6 className="mb-0">{item.userName}</h6>
                          <small>{timeAgo(item.timestamp)}</small>
                        </div>
                        <span>{item.complaintDetail}</span>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Widgets End */}
        <div className="container-fluid pt-4 px-4">
          <div className="bg-light rounded-top p-4">
            <div className="row">
              <div className="col-12 col-sm-6 text-center text-sm-start">
                © <a href="/#">VenueVista</a>, All Right Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="/#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up" />
      </a>
    </>
  );
}

export default Dashboard;
