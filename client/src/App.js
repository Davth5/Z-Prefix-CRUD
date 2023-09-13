import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import UserInventory from "./components/UserInventory";
import { UserProvider } from "./components/UserContext";
import AddItem from "./components/AddItem";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  console.log("Current user state:", user);

  return (
    <Router>
      <UserProvider value={{ user, setUser }}>
        <Routes>
          {!user ? (
            <>
              <Route
                path="/login"
                element={<Login onUserLoggedIn={setUser} />}
              />
              <Route
                path="/register"
                element={<Register onUserRegistered={setUser} />}
              />
              <Route path="/" element={<Navigate to="/login" />} />
              {console.log("Rendering unauthenticated routes")}
            </>
          ) : (
            <>
              <Route
                path="/dashboard"
                element={<UserInventory userId={user.id} />}
              />
              <Route path="/add-item" element={<AddItem />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
              {console.log("Rendering authenticated routes")}
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
      </UserProvider>
    </Router>
  );
}

export default App;
