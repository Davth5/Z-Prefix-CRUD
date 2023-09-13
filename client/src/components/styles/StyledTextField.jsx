// StyledTextField.jsx
import React from "react";
import { TextField } from "@mui/material";

function StyledTextField(props) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      margin="normal"
      {...props} // This will allow you to pass any additional props to the TextField
    />
  );
}

export default StyledTextField;
