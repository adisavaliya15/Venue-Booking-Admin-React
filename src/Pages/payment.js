import React, { useEffect, useState } from "react";
import axios from "axios";
import { CDBDataTable } from "cdbreact";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function Payment() {
  const [isLoaded, setLoaded] = useState(false);
  const [datas, setDatas] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    try {
      axios
        .post(
          "http://localhost:8000/api/admin/view_payments",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setDatas(response.data.payments);
        })
        .then(() => setLoaded(true));
    } catch (error) {
      alert("Something went wrong, please try again!");
    }
  }, []);

  const downloadMonthlyReport = () => {
    let filteredData = datas.filter((data) => {
      const dataDate = new Date(data.paymentDate);
      if (startDate && endDate) {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        // Include the end date if it's the same as the start date
        endDateObj.setDate(endDateObj.getDate() + 1);
        return dataDate >= startDateObj && dataDate < endDateObj;
      }
      return true;
    });

    const totalAmount = filteredData.reduce(
      (total, data) => total + parseFloat(data.paymentAmount),
      0
    );

    const doc = new jsPDF();
    doc.autoTable({
      head: [
        [
          "Venue Id",
          "Amount",
          "Payment Id",
          "Payment Status",
          "Payment Method",
          "Date",
        ],
      ],
      body: filteredData.map((data) => [
        data.venueId,
        data.paymentAmount,
        data.paymentId,
        data.paymentStatus,
        data.paymentMethod,
        new Date(data.paymentDate).toLocaleDateString("en-IN"),
      ]),
    });

    doc.autoTable({
      body: [["Total Amount", "", "", "", "", totalAmount.toFixed(2)]],
      startY: doc.lastAutoTable.finalY + 10,
    });

    doc.save("monthly_report.pdf");
  };

  console.log(datas);

  if (datas.length === 0) {
    return null;
  }

  return (
    <>
      <div>
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
        <Sidebar />
        <div className="content">
          <Navbar />
          <div className="container-fluid pt-4 px-4">
            <div className="bg-light text-center rounded p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">Recent Payment</h6>
                <div className="row input-group">
                  <div className="col">
                    <input
                      type="date"
                      className="form-control"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      max={endDate}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="date"
                      className="form-control"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate}
                    />
                  </div>
                </div>
              </div>
              <button
                className="btn btn-primary"
                onClick={downloadMonthlyReport}
              >
                Download Monthly Report
              </button>
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
                  entriesOptions={[5, 10, 15]}
                  entries={5}
                  pagesAmount={4}
                  data={{
                    columns: [
                      { label: "Venue Id", field: "venueId" },
                      { label: "Amount", field: "paymentAmount" },
                      { label: "Payment Id", field: "paymentId" },
                      { label: "Payment Status", field: "paymentStatus" },
                      { label: "Payment Method", field: "paymentMethod" },
                      { label: "Date", field: "paymentDate" },
                    ],
                    rows: datas.map((data) => ({
                      venueId: data.venueId,
                      paymentAmount: data.paymentAmount,
                      paymentId: data.paymentId,
                      paymentStatus: data.paymentStatus,
                      paymentMethod: data.paymentMethod,
                      paymentDate: new Date(data.paymentDate).toLocaleString(),
                    })),
                  }}
                />
              </div>
            </div>
          </div>
          <Footer />
        </div>
        <a
          href="/#"
          className="btn btn-lg btn-primary btn-lg-square back-to-top"
        >
          <i className="bi bi-arrow-up" />
        </a>
      </div>
    </>
  );
}
