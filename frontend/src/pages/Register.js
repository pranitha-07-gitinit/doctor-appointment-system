import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      await axios.post(
        "https://doctor-backend-x67s.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Registration Successful!");

    } catch (err) {
      alert("Registration Failed");
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={registerUser}>
        Register
      </button>
      <br /><br />

<Link to="/">
  Already have an account? Login
</Link>
    </div>
  );
}

export default Register;