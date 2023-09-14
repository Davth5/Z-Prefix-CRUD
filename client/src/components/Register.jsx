import React, { useState } from "react";
import axios from "axios";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import StyledWrapper from "./styles/StyledWrapper";

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
    <StyledWrapper>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          label="First Name"
          required
          margin="normal"
        />
        <TextField
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          label="Last Name"
          required
          margin="normal"
        />
        <TextField
          fullWidth
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          required
          margin="normal"
        />
        <TextField
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          required
          margin="normal"
        />
        {successMessage && (
          <Typography color="success">{successMessage}</Typography>
        )}
        {error && <Typography color="error">{error}</Typography>}
        <Box mt={2} style={{ textAlign: "center" }}>
          <Button variant="contained" color="primary" type="submit" >
            Register
          </Button>
        </Box>
      </form>
    </StyledWrapper>
  );
}

export default Register;
