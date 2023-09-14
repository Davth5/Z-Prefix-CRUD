import React, { useState } from "react";
import { useUser } from "./UserContext";
import axios from "axios";
import { useNavigate } from "react-router";
import { TextField, Button, Box, Typography } from "@mui/material";
import StyledWrapper from "./styles/StyledWrapper";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useUser();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting login with:", { username, password });

      const response = await axios.post("http://localhost:8080/login", {
        userName: username,
        password,
      });
      const data = response.data;

      console.log("Login API response:", data);

      if (data && data.id) {
        console.log("Setting user data:", data);
        setUser({ id: data.id, userName: data.userName });
        console.log("Called setUser function");
        navigate("/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Invalid username or password");
    }
  };

  return (
    <StyledWrapper>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          value={username}
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
        {error && <Typography color="error">{error}</Typography>}
        <Box mt={2} style={{ textAlign: "center" }}>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </StyledWrapper>
  );
}

export default Login;
