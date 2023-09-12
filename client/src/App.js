import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import UserInventory from "./components/UserInventory";
import { UserProvider } from "./components/UserContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <UserProvider value={{ user, setUser }}>
        {!user ? (
          <div>
            <Routes>
              <Route
                path="/login"
                element={<Login onUserLoggedIn={setUser} />}
              />
              <Route
                path="/register"
                element={<Register onUserRegistered={setUser} />}
              />
              <Route path="*" element={<Login onUserLoggedIn={setUser} />} />
            </Routes>
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </div>
        ) : (
          <UserInventory userId={user.id} />
        )}
      </UserProvider>
    </Router>
  );
}

export default App;
