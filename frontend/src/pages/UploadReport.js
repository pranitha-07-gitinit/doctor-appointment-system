import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function UploadReport() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadReport = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();

    // MUST match backend upload.single("file")
    formData.append("reportFile", file);

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      await axios.post(
        "https://doctor-backend-x67s.onrender.com/api/reports/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Report Uploaded Successfully");

      setFile(null);
      document.getElementById("fileInput").value = "";
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2>Upload Medical Report</h2>

        <input
          id="fileInput"
          type="file"
          className="form-control"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br />

        <button
          className="btn btn-primary"
          onClick={uploadReport}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </>
  );
}

export default UploadReport;