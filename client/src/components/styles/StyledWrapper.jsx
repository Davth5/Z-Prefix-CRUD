import React from "react";
import { Card, Box } from "@mui/material";

function StyledWrapper({ children }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="calc(100vh - 60px)"
      padding="30px 0"
    >
      <Card style={{ width: "500px", padding: "20px", margin: "20px auto" }}>
        {children}
      </Card>
    </Box>
  );
}

export default StyledWrapper;
