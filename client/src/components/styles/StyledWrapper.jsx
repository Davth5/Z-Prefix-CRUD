import React from "react";
import { Card, Box } from "@mui/material";

function StyledWrapper({ children }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card style={{ width: "500px", padding: "20px", margin: "20px auto" }}>
        {children}
      </Card>
    </Box>
  );
}

export default StyledWrapper;
