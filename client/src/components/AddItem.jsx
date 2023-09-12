import React, { useState } from "react";
import axios from "axios";

function AddItem({ userId, onItemAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/user/inventory/${userId}/post`,
        { name, description, quantity }
      );
      const data = response.data;

      if (data) {
        onItemAdded(data);
      }
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Item Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>

      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </label>

      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddItem;
