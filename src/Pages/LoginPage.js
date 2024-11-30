import React, { useState } from "react";
import axios from "axios";

function LoginPage() {
  axios.defaults.withCredentials = true;

  //hook for Storing email & password
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLoaded, setLoaded] = useState(true);

  //getting textdata from input fields
  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    //storing textdata from input fields
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //callback function to FIRE login API
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setLoaded(false);
    //calling Login API
    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/login",
        loginData,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("token", response.data.token);
      alert("Login Succesfully!");
      window.location.reload(false);
    } catch (error) {
      console.log("Login Err: ", error);
      alert(error.response.data.message);
    }

    //set login data in Login hook
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      {" "}
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
      <section className="bg-light py-3 py-md-5">
        <div className="container center">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div className="card border border-light-subtle rounded-3 shadow-sm">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <h2 className="fs-4 fw-normal text-center text-primary mb-4">
                    Admin Login
                  </h2>
                  <form onSubmit={handleLoginSubmit} className="form">
                    <div className="row gy-2 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            onChange={handleLoginChange}
                            value={loginData.email}
                            placeholder="Email"
                            required
                          />
                          <label className="form-label">Email</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            onChange={handleLoginChange}
                            value={loginData.password}
                            placeholder="Enter you password.."
                            id="password"
                            required
                          />
                          <label className="form-label">Password</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="d-grid my-3">
                          <button
                            className="btn btn-primary btn-lg"
                            type="submit"
                          >
                            Log in
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
