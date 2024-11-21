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
import { useAuth } from "../contexts/AuthContext"; // Access authentication context
import MenuIcon from "@mui/icons-material/Menu"; // Hamburger menu icon

const NavBar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth(); // Get authentication state and logout function
  const navigate = useNavigate(); // For navigation after logout

  const handleLogout = () => {
    logout(); // Perform logout
    navigate("/login"); // Redirect to login page
  };

  const [open, setOpen] = React.useState(false); // State to control drawer visibility

  const toggleDrawer = (open: boolean) => {
    setOpen(open); // Open or close the drawer
  };

  return (
    <AppBar position="fixed" sx={{ width: "100%", backgroundColor: "#333" }}>
      <Toolbar>
        {/* Logo and System Name */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Book Corner
          </Typography>
        </Box>

        {/* Hamburger Menu Icon for Mobile */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={() => toggleDrawer(true)}
          sx={{ display: { xs: "block", md: "none" } }} // Show only on small screens
        >
          <MenuIcon />
        </IconButton>

        {/* User-Specific Buttons for Desktop */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {" "}
          {/* Show only on larger screens */}
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
