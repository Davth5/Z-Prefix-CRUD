// StyledButton.jsx
import React from "react";
import { Button } from "@mui/material";

function StyledButton(props) {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{ marginTop: "20px" }}
      {...props}
    />
  );
}

export default StyledButton;
