import React, { useState, useEffect } from "react";
import AddItem from "./AddItem";
import ItemList from "./ItemList";
import axios from "axios";

function UserInventory({ userId }) {
  const [items, setItems] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle any errors

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/${userId}/items`
        );
        console.log("Fetched items:", response.data);

        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
        setError("Failed to fetch items.");
      }
    };

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/${userId}`
        );
        const data = response.data;
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setError("Failed to fetch user information.");
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchItems(), fetchUserInfo()]);
      setLoading(false); // Set loading to false once both requests are complete
    };

    fetchData();
  }, [userId]);

  const handleItemAdded = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
