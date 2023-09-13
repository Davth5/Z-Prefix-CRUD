import React, { useState } from "react";
import axios from "axios";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const { handleUserRegistered } = useUser();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:8080/register", {
        userName,
        password,
        firstName,
        lastName,
      });
      console.log("Registration response status:", response.status);
      console.log("Registration response data:", response.data);
      const data = response.data;

      if (data && data.id) {
        handleUserRegistered(data);
        setSuccessMessage("Successfully registered!");
        navigate("/dashboard");
      }
    } catch (err) {
      setSuccessMessage("");
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
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
