import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, CardMedia } from "@mui/material";
import { Link } from "react-router-dom"; 
import StyledWrapper from "./styles/StyledWrapper";
import StyledTitle from "./styles/StyledTitle";

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
    <div style={{ padding: "20px" }}>
      <StyledTitle>All Items:</StyledTitle>
      <Grid container spacing={2} justifyContent="center">
        {items.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={item.id}
            style={{ overflow: "hidden" }}
          >
            <StyledWrapper
              style={{
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              <Link
                to={`/item/${item.id}`}
                style={{ textDecoration: "none", color: "#3f51b5" }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  width="100%"
                  image={`https://picsum.photos/200/300?random=${item.id}`}
                  alt="Random Image"
                  style={{ objectFit: "cover" }}
                />
                {item.itemName}
              </Link>
              <p>
                {item.description.length > 100
                  ? `${item.description.substring(0, 100)}...`
                  : item.description}
              </p>
            </StyledWrapper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default AllItems;
