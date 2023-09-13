import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CardMedia } from "@mui/material";
import StyledWrapper from "./styles/StyledWrapper";
import StyledTitle from "./styles/StyledTitle";
import StyledButton from "./styles/StyledButton";

function ItemDetails() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // New state for edit mode
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

  const handleUpdate = async () => {
    try {
      await axios.patch(`/items/${itemId}`, item);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <StyledWrapper>
      {item ? (
        <>
          {isEditMode ? (
            <input
              type="text"
              value={item.itemName}
              onChange={(e) => setItem({ ...item, itemName: e.target.value })}
            />
          ) : (
            <StyledTitle>{item.itemName}</StyledTitle>
          )}
          <CardMedia
            component="img"
            height="250"
            width="100%"
            image={`https://picsum.photos/200/300?random=${item.id}`}
            alt="Random Image"
            style={{ objectFit: "cover" }}
          />
          <p>
            Description:
            {isEditMode ? (
              <input
                type="text"
                value={item.description}
                onChange={(e) =>
                  setItem({ ...item, description: e.target.value })
                }
              />
            ) : (
              item.description
            )}
          </p>
          <p>
            Quantity:
            {isEditMode ? (
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => setItem({ ...item, quantity: e.target.value })}
              />
            ) : (
              item.quantity
            )}
          </p>
          <StyledButton onClick={handleDelete}>Delete</StyledButton>
          {isEditMode ? (
            <StyledButton onClick={handleUpdate}>Update</StyledButton>
          ) : (
            <StyledButton onClick={() => setIsEditMode(true)}>
              Edit
            </StyledButton>
          )}
        </>
      ) : (
        <p>Loading item details...</p>
      )}
    </StyledWrapper>
  );
}

export default ItemDetails;
