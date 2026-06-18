import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        "https://doctor-backend-x67s.onrender.com/api/appointments/book"
      );

      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const bookAppointment = async (doctorId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://doctor-backend-x67s.onrender.com/api/appointments/book",
        {
          doctorId,
          date: "2026-06-20",
          time: "10:00 AM",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Appointment Booked!");
    } catch (err) {
      console.log(err);
      alert("Booking Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="mb-4">Doctors</h2>

        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="card mb-3 shadow"
          >
            <div className="card-body">
              <h4>{doctor.name}</h4>

              <p>
                <strong>Specialization:</strong>{" "}
                {doctor.specialization}
              </p>

              <p>
                <strong>Experience:</strong>{" "}
                {doctor.experience} years
              </p>

              <p>
                <strong>Fees:</strong> ₹{doctor.fees}
              </p>

              <button
                className="btn btn-success"
                onClick={() =>
                  bookAppointment(doctor._id)
                }
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Doctors;