import React, { useState } from "react";
import { useUser } from "./UserContext";
import axios from "axios";
import { useNavigate } from "react-router";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to handle error messages
  const { setUser } = useUser();
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting login with:", { username, password }); // Log the login attempt

      const response = await axios.post("http://localhost:8080/login", {
        userName: username,
        password,
      });
      const data = response.data;

      console.log("Login API response:", data); // Log the API response

      if (data && data.id) {
        setUser({ id: data.id, userName: data.userName });
        navigate("/dashboard"); // Redirect to dashboard after successful login
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Invalid username or password"); // Set the error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {error && <p className="error-message">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
