import React, { useEffect, useState } from "react";
import axios from "axios";
import { CDBDataTable } from "cdbreact";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Venue() {
  const [isLoaded, setLoaded] = useState(false);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    try {
      axios
        .post(
          "http://localhost:8000/api/view_venues",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setDatas(response.data.venueData);
        })
        .then(() => setLoaded(true));
    } catch (error) {
      alert("Something went wrong, please try again!");
    }
  }, []);

  console.log(datas);

  if (datas.length === 0) {
    return null;
  }

  return (
    <>
      <Sidebar />
      <div className="content">
        <Navbar />
        {isLoaded ? null : (
          <div
            id="spinner"
            className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
          >
            <div
              className="spinner-border text-primary"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <div className="container-fluid pt-4 px-4">
          <div className="bg-light text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Recent Venue</h6>
              <a href>Show All Venue</a>
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
                  columns: [
                    { label: "Name", field: "name" },
                    { label: "Address", field: "address" },
                    { label: "About", field: "about" },
                    { label: "Enquiry No", field: "enquiryNo" },
                    { label: "Capacity", field: "capacity" },
                    { label: "Price Per Day", field: "pricePerDay" },
                    { label: "Wifi", field: "isWifi" },
                    { label: "AC", field: "isAC" },
                  ],
                  rows: datas.map((data) => ({
                    name: data.name,
                    address: data.address,
                    about: data.about,
                    enquiryNo: data.enquiryNo,
                    capacity: data.capacity,
                    pricePerDay: data.pricePerDay,
                    isWifi: data.isWifi,
                    isAC: data.isAC,
                  })),
                }}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <a href="/#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up" />
      </a>
    </>
  );
}
export default Venue;
