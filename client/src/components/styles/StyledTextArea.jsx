// StyledTextArea.jsx
import React from "react";
import { TextField } from "@mui/material";

function StyledTextArea(props) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      margin="normal"
      multiline
      rows={4}
      {...props}
    />
  );
}

export default StyledTextArea;
