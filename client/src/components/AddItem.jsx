import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Box
} from "@mui/material";

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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card style={{ width: "500px" }}>
        <h2>Add Item</h2>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
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
                  variant="outlined"
                  size="small"
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  variant="outlined"
                  size="small"
                  label="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" type="submit">
              Add Item
            </Button>
          </CardActions>
        </form>
      </Card>
    </Box>
  );
}

export default AddItem;
