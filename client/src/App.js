import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import UserInventory from "./components/UserInventory";
import { UserProvider } from "./components/UserContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <UserProvider value={{ user, setUser }}>
        <Routes>
          {/* Routes for unauthenticated users */}
          {!user && (
            <>
              <Route
                path="/login"
                element={<Login onUserLoggedIn={setUser} />}
              />
              <Route
                path="/register"
                element={<Register onUserRegistered={setUser} />}
              />
              {/* Default redirect to login */}
              <Route path="/" element={<Navigate to="/login" />} />
            </>
          )}

          {/* Routes for authenticated users */}
          {user && (
            <>
              <Route
                path="/dashboard"
                element={<UserInventory userId={user.id} />}
              />
              {/* Default redirect to dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </>
          )}
        </Routes>

        {/* Navigation links */}
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
