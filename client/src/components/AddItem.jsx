import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

function AddItem({ onItemAdded }) {
  // Accept the onItemAdded prop
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemData = {
      userId: user.id,
      itemName,
      description,
      quantity: parseInt(quantity, 10),
    };

    try {
      const response = await axios.post("/items", itemData);
      console.log("Item added:", response.data);

      // Notify the parent that an item has been added
      if (onItemAdded) {
        onItemAdded(response.data);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div>
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Item Name:</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default AddItem;
