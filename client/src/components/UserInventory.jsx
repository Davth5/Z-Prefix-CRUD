import React, { useState, useEffect } from "react";
import AddItem from "./AddItem";
import ItemList from "./ItemList";
import axios from "axios";

function UserInventory({ userId }) {
  const [items, setItems] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/${userId}/items`
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users/${userId}`);
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchUserInfo();
  }, [userId]);

  const handleItemAdded = async (newItem) => {
    // Optimistically update the UI
    setItems((prevItems) => [...prevItems, newItem]);

    // Re-fetch items to ensure data consistency
    await fetchItems();
  };

  return (
    <div>
      {userInfo && (
        <div>
          <h2>Welcome, {userInfo.userName}!</h2>
          <p>User ID: {userInfo.id}</p>
        </div>
      )}

      <AddItem userId={userId} onItemAdded={handleItemAdded} />
      <ItemList items={items} />
    </div>
  );
}

export default UserInventory;
