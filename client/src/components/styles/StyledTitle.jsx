// StyledTitle.jsx
import React from "react";

function StyledTitle({ children }) {
  return (
    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>{children}</h2>
  );
}

export default StyledTitle;
