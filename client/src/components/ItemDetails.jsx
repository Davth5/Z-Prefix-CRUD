import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CardMedia, TextField, Box } from "@mui/material";
import StyledWrapper from "./styles/StyledWrapper";
import StyledTitle from "./styles/StyledTitle";
import StyledButton from "./styles/StyledButton";
import { useUser } from "./UserContext";

function ItemDetails() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

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
    if (!user) return;
    try {
      await axios.delete(`/items/${itemId}`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleUpdate = async () => {
    if (!user) return;
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
            <TextField
              fullWidth
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
            style={{ objectFit: "cover", marginBottom: "20px" }}
          />
          <Box mb={2} style={{ textAlign: "center" }}>
            Description:
            {isEditMode ? (
              <TextField
                fullWidth
                multiline
                rows={4}
                value={item.description}
                onChange={(e) =>
                  setItem({ ...item, description: e.target.value })
                }
              />
            ) : (
              <p>{item.description}</p>
            )}
          </Box>
          <Box mb={2} style={{ textAlign: "center" }}>
            Quantity:
            {isEditMode ? (
              <TextField
                type="number"
                fullWidth
                value={item.quantity}
                onChange={(e) => setItem({ ...item, quantity: e.target.value })}
              />
            ) : (
              <p>{item.quantity}</p>
            )}
          </Box>
          {user && (
            <Box display="flex" justifyContent="space-between">
              <Box>
                {isEditMode ? (
                  <StyledButton onClick={handleUpdate}>Update</StyledButton>
                ) : (
                  <StyledButton onClick={() => setIsEditMode(true)}>
                    Edit
                  </StyledButton>
                )}
              </Box>
              <Box>
                <StyledButton onClick={handleDelete}>Delete</StyledButton>
              </Box>
            </Box>
          )}
        </>
      ) : (
        <p>Loading item details...</p>
      )}
    </StyledWrapper>
  );
}

export default ItemDetails;
