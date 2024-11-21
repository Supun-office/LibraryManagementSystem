import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Drawer,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MenuIcon from "@mui/icons-material/Menu"; // Hamburger menu icon

const NavBar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth(); // Get authentication state and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Perform logout
    navigate("/login"); // Redirect to the login page
  };

  // Drawer state for mobile view
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => {
    setOpen(open);
  };

  return (
    <AppBar position="fixed" sx={{ width: "100%", backgroundColor: "#333" }}>
      <Toolbar>
        {/* Logo and System Name */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <img
            src="/logo.png"
            alt="Library Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Library Management System
          </Typography>
        </Box>

        {/* Hamburger Menu Icon for Mobile */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={() => toggleDrawer(true)}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* User-specific Buttons for Desktop */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Box>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>

      {/* Drawer for Mobile Navigation */}
      <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          {isAuthenticated ? (
            <ListItem component="div" onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          ) : (
            <>
              <ListItem
                component={Link}
                to="/login"
                onClick={() => toggleDrawer(false)}
              >
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem
                component={Link}
                to="/register"
                onClick={() => toggleDrawer(false)}
              >
                <ListItemText primary="Register" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
