import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import UserInventory from "./components/UserInventory";
import { useUser } from "./components/UserContext";
import AddItem from "./components/AddItem";
import ItemDetails from "./components/ItemDetails";
import AllItems from "./components/AllItems";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

function App() {
  const { user } = useUser();

  console.log("Current user state:", user);
  console.log("Is user authenticated?", !!user);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/item/:itemId" element={<ItemDetails />} />
        <Route path="/items/all" element={<AllItems />} />

        {!user ? (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/add-item" element={<AddItem />} />

            <Route
              path="/dashboard"
              element={<UserInventory userId={user.id} />}
            />

            <Route path="/" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
