// StyledButton.jsx
import React from "react";
import { Button } from "@mui/material";

function StyledButton(props) {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{ marginTop: "20px", textAlign: "center" } }
      {...props}
    />
  );
}

export default StyledButton;
