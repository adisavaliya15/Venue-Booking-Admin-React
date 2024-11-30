import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      axios
        .post(
          "http://localhost:8000/api/admin/view_reviews",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setFeedbacks(response.data.reviews);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      alert("Something went wrong, please try again!");
    }
  }, []);

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
      <div className="content">
        <Navbar />
        {/* Navbar End */}
        {/* Messages */}
        <div className="h-100 bg-light rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h6 className="mb-0">Feedback</h6>
            <a href>Show All</a>
          </div>
          {feedbacks.map((item, i) => (
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
                  <span>{item.review}</span>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      <a href="/#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up" />
      </a>
    </>
  );
}
