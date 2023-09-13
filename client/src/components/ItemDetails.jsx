import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import StyledWrapper from "./styles/StyledWrapper";
import StyledTitle from "./styles/StyledTitle";
import StyledButton from "./styles/StyledButton";

function ItemDetails() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`/items/item/${itemId}`);
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/items/${itemId}`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <StyledWrapper>
      {item ? (
        <>
          <StyledTitle>{item.itemName}</StyledTitle>
          <p>Description: {item.description}</p>
          <p>Quantity: {item.quantity}</p>
          <StyledButton onClick={handleDelete}>Delete</StyledButton>
        </>
      ) : (
        <p>Loading item details...</p>
      )}
    </StyledWrapper>
  );
}

export default ItemDetails;
