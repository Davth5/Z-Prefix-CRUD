import React, { useState } from "react";
import axios from "axios";

function Register({ onUserRegistered }) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/register", {
        userName,
        password,
        firstName,
        lastName,
      });
      const data = response.data;
      if (data && data.userId) {
        onUserRegistered(data);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Username already exists. Choose a different one."); 
      } else {
        setError("Error registering. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {error && <p className="error-message">{error}</p>}

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
