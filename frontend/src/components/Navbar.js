import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/doctors">
          Doctor Appointment System
        </Link>

        <div className="navbar-nav ms-auto">

          <Link
            className="nav-link"
            to="/dashboard"
          >
            Dashboard
          </Link>

          <Link
            className="nav-link"
            to="/doctors"
          >
            Doctors
          </Link>

          <Link
            className="nav-link"
            to="/my-appointments"
          >
            My Appointments
          </Link>

          <Link
            className="nav-link"
            to="/my-reports"
          >
            My Reports
          </Link>

          <Link
            className="nav-link"
            to="/upload-report"
          >
            Upload Report
          </Link>

          <button
            className="btn btn-danger ms-3"
            onClick={logout}
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;