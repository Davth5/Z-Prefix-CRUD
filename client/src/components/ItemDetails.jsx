import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div>
      {item ? (
        <>
          <h2>{item.itemName}</h2>
          <p>Description: {item.description}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <p>Loading item details...</p>
      )}
    </div>
  );
}

export default ItemDetails;
