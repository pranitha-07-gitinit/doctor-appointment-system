import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://doctor-backend-x67s.onrender.com/api/appointments/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `https://doctor-backend-x67s.onrender.com/api/appointments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.msg);
      fetchAppointments();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="mb-4">
          My Appointments
        </h2>

        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          appointments.map((appt) => (
            <div
              key={appt._id}
              className="card mb-3 shadow"
            >
              <div className="card-body">
                <h4>{appt.doctorId?.name}</h4>

                <p>
                  <strong>Specialization:</strong>{" "}
                  {appt.doctorId?.specialization}
                </p>

                <p>
                  <strong>Date:</strong> {appt.date}
                </p>

                <p>
                  <strong>Time:</strong> {appt.time}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {appt.status === "cancelled" ? (
                    <span className="badge bg-danger">
                      Cancelled
                    </span>
                  ) : (
                    <span className="badge bg-success">
                      Booked
                    </span>
                  )}
                </p>

                {appt.status !==
                  "cancelled" && (
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      cancelAppointment(appt._id)
                    }
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default MyAppointments;