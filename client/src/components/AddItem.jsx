import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { TextField, Button, Grid } from "@mui/material";

function AddItem({ onItemAdded }) {
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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Add Item
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default AddItem;
