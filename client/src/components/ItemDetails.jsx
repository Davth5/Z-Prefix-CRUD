import React, { useState, useEffect } from "react";
import axios from "axios";

function ItemDetails({ itemId }) {
  const [item, setItem] = useState(null);

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

  return (
    <div>
      {item ? (
        <>
          <h2>{item.itemName}</h2>
          <p>Description: {item.description}</p>
          <p>Quantity: {item.quantity}</p>
        </>
      ) : (
        <p>Loading item details...</p>
      )}
    </div>
  );
}

export default ItemDetails;
