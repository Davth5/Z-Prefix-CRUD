import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import StyledWrapper from "./styles/StyledWrapper";
import { Button, Box } from "@mui/material"; 
import StyledTextArea from "./styles/StyledTextArea";
import StyledTextField from "./styles/StyledTextField";
import StyledTitle from "./styles/StyledTitle";

function AddItem({ onItemAdded }) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!itemName.trim() || !description.trim() || !quantity) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

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
      setErrorMessage("Error adding item. Please try again.");
    }
  };

  return (
    <StyledWrapper>
      <StyledTitle>Add Item</StyledTitle>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <StyledTextField
          label="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <StyledTextArea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <StyledTextField
          type="number"
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Box mt={2} style={{ textAlign: "center" }}>
          <Button variant="contained" color="primary" type="submit">
            Add Item
          </Button>
        </Box>
      </form>
    </StyledWrapper>
  );
}

export default AddItem;
