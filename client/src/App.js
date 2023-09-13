import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import UserInventory from "./components/UserInventory";
import { useUser } from "./components/UserContext"; // Import the useUser hook
import AddItem from "./components/AddItem";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

function App() {
  const { user, setUser } = useUser(); // Use the useUser hook to get user and setUser

  console.log("Current user state:", user);
  console.log("Is user authenticated?", !!user);

  return (
    <Router>
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route
              path="/dashboard"
              element={<UserInventory userId={user.id} />}
            />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>

      <div>
        <button>
          <Link to="/login">Login</Link>
        </button>
        <button>
          <Link to="/register">Register</Link>
        </button>
      </div>
    </Router>
  );
}

export default App;
