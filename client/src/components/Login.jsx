import React, { useState } from "react";
import { useUser } from "./UserContext";
import axios from "axios";

function mockLogin(username, password) {
  // Replace this with a real API call in the future.
  if (username === "admin" && password === "password") {
    return { id: "123", username: "admin", token: "mockToken123" };
  }
  throw new Error("Invalid username or password");
}

function Login({ onUserLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        userName: username,
        password,
      });
      const data = response.data;
      if (data && data.id) {
        setUser({ id: data.id, userName: data.userName });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
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
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
