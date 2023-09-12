import React, { useState, useEffect } from "react";
import AddItem from "./AddItem";
import ItemList from "./ItemList";
import axios from "axios";

function UserInventory({ userId }) {
  const [items, setItems] = useState([]);

useEffect(() => {
  const fetchItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/items/${userId}`);
      const data = response.data;
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  fetchItems();
}, [userId]);

  const handleItemAdded = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div>
      <AddItem userId={userId} onItemAdded={handleItemAdded} />
      <ItemList items={items} />
    </div>
  );
}

export default UserInventory;
