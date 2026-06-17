import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function MyReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/reports/my-reports",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReports(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2>My Reports</h2>

        {reports.length === 0 ? (
          <div className="alert alert-info">
            No reports uploaded.
          </div>
        ) : (
          reports.map((report) => (
            <div
              key={report._id}
              className="card mb-3 shadow"
            >
              <div className="card-body">
                <h5>{report.filename}</h5>

                <p>
                  Uploaded on:{" "}
                  {new Date(
                    report.uploadedAt
                  ).toLocaleString()}
                </p>

                <a
                  href={`http://localhost:5000/${report.filepath}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  View Report
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default MyReports;