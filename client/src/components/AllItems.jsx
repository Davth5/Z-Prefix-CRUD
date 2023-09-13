import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StyledWrapper from "./styles/StyledWrapper";

function AllItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/items/all`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching all items:", error);
      }
    };

    fetchAllItems();
  }, []);

  return (
    <div>
      <h3>All Items:</h3>

      {items.map((item) => (
        <StyledWrapper>
          <div key={item.id}>
            <Link to={`/item/${item.id}`}>{item.itemName}</Link>
            <p>
              {item.description.length > 100
                ? `${item.description.substring(0, 100)}...`
                : item.description}
            </p>
          </div>
        </StyledWrapper>
      ))}
    </div>
  );
}

export default AllItems;
