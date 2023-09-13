import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddItem from "./AddItem";

function UserInventory({ userId }) {
  const [items, setItems] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/items/${userId}`
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/${userId}`
        );
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchItems();
    fetchUserInfo();
  }, [userId]);

  const handleItemAdded = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const containerStyle = {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "80%",
    margin: "0 auto",
    marginTop: "20px",
  };

  const userInfoStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const inventoryStyle = {
    marginTop: "20px",
  };

  const itemStyle = {
    margin: "10px 0",
    padding: "5px",
    border: "1px solid #ddd",
    borderRadius: "3px",
  };

  return (
    <div style={containerStyle}>
      {userInfo && (
        <div style={userInfoStyle}>
          <h2>Welcome, {userInfo.userName}!</h2>
          <p>User ID: {userInfo.id}</p>
        </div>
      )}

      <AddItem userId={userId} onItemAdded={handleItemAdded} />

      <div style={inventoryStyle}>
        <h3>Your Inventory:</h3>
        {items.map((item) => (
          <div key={item.id} style={itemStyle}>
            <Link to={`/item/${item.id}`}>{item.itemName}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserInventory;
