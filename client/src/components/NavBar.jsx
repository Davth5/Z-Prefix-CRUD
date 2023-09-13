import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

function NavBar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };
  const navButtonStyle = {
    padding: "10px 15px",
    margin: "10px",
    backgroundColor: "#007BFF",
    color: "#FFF",
    border: "none",
    borderRadius: "5px",
    textDecoration: "none",
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar
          src="https://as1.ftcdn.net/v2/jpg/05/45/84/04/1000_F_545840416_gLpBN0uxirMS3ovPrQD9LcN4ooHfUZ4s.jpg"
          alt="Logo"
          style={{ marginRight: "20px" }}
        />
        <Typography
          variant="h6"
          component="a"
          href="/"
          style={{ marginRight: "20px" }}
        >
          IMS
        </Typography>

        <Button color="inherit" component={Link} to="/items/all">
          Inventory
        </Button>

        {!user ? (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>

            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
