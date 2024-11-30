import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  //for open close the navbar
  function nav_open_close(e) {
    var element = document.getElementById("sidebar");
    var element2 = document.getElementById("content");
    element.classList.toggle("open");
    element2.classList.toggle("open");
  }

  return (
    <>
      {/* Navbar Start */}
      <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
        <Link to="/" className="navbar-brand d-flex d-lg-none me-4">
          <h2 className="text-primary mb-0">
            <i className="fa fa-star" />
          </h2>
        </Link>
        <a
          href="/#"
          className="sidebar-toggler flex-shrink-0"
          onClick={nav_open_close}
        >
          <i className="fa fa-bars" />
        </a>
        <form className="d-none d-md-flex ms-4 ">
          <input
            className="form-control border-0 active"
            type="search"
            placeholder="Search"
          />
        </form>
      </nav>
      {/* Navbar End */}
    </>
  );
}

export default Navbar;
