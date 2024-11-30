import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function Complaints() {
  const [selected, setSelected] = React.useState(null);
  const [complaintData, setComplaintData] = React.useState([]);
  const [isLoaded, setLoaded] = React.useState(false);

  useEffect(() => {
    try {
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
        .then((response) => setComplaintData(response.data.complaints))
        .then(() => setLoaded(true)).catch((error) => console.log(error));
    } catch (error) {
      alert("Something went wrong, please try again!");
    }
  }, []);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
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
        <div className="bg-light rounded h-100 p-4">
          <h6 className="mb-4">Complaints</h6>
          <div className="accordion">
            <div className="accordion-item">
              {complaintData.map((item, i) => (
                <>
                  <h2 className="accordion-header" onClick={() => toggle(i)}>
                    <button
                      className={`accordion-button ${
                        selected === i ? "collapsed" : ""
                      }`}
                      type="button"
                    >
                      #Comment - {item._id}
                    </button>
                  </h2>
                  <div
                    className={`accordion-collapse collapse ${
                      selected === i ? "show" : ""
                    }`}
                  >
                    <div className="accordion-body">{item.complaintDetail}</div>
                  </div>
                </>
              ))}
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

export default Complaints;
