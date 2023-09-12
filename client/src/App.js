import "./App.css";
import React, { useState, useEffect } from "react";
import AddItem from "./components/AddItem";
import ItemList from "./components/ItemList";

function App() {
  const userId = "YOUR_USER_ID"; // Dynamic value.

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`/api/items/${userId}`);
        const data = await response.json();
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

export default App;
