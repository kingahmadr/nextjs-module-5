"use client";
import * as React from "react";
// import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import MailIcon from "@mui/icons-material/Mail";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { UseDataContext } from "../contexts/UseDataContext";
import { deleteCookie } from "cookies-next";

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

export default function Navbar() {
  const router = useRouter();
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [humbergerButton, setHumbergetButton] =
    React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  //   const isMenuOpen = Boolean(anchorEl);
  const isHumbergerButtonOpen = Boolean(humbergerButton);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { total, isAuthenticated } = UseDataContext();
  console.log("isAuthenticated in navbar", isAuthenticated);

  // const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleHumbergerButton = (event: React.MouseEvent<HTMLElement>) => {
  //   setHumbergetButton(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setHumbergetButton(null);
    // setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    deleteCookie("token", {
      maxAge: 60 * 5,
      path: "/",
      httpOnly: false,
      sameSite: "strict",
    });
    window.location.reload();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      anchorEl={humbergerButton}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isHumbergerButtonOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={() => navigate("/products")}>Home</MenuItem>
      <MenuItem onClick={() => navigate("/checkout")}>Checkout</MenuItem> */}
      <MenuItem onClick={() => router.push("/")}>Home</MenuItem>
      <MenuItem onClick={() => router.push("/checkout")}>Checkout</MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!isAuthenticated ? (
        <div>
          <MenuItem>
            <IconButton
              onClick={() => router.push("/login")}
              size="large"
              color="inherit"
            >
              <LoginIcon />
            </IconButton>
            <button onClick={() => router.push("/login")}>Login</button>
            {/* <p>Login</p> */}
          </MenuItem>
          <MenuItem>
            <IconButton
              onClick={() => router.push("/register")}
              size="large"
              color="inherit"
            >
              <PersonAddAltIcon />
            </IconButton>
            <button onClick={() => router.push("/register")}>Register</button>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="show notif on cart"
              color="inherit"
              onClick={() => {
                router.push("/checkout");
              }}
            >
              <Badge badgeContent={total} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {/* <p>Shopping Cart</p> */}
            <button
              onClick={() => {
                router.push("/checkout");
              }}
            >
              Shopping Cart
            </button>
          </MenuItem>
          <MenuItem>
            <IconButton onClick={handleLogout} size="large" color="inherit">
              <LogoutIcon />
            </IconButton>
            <button onClick={handleLogout}>logout</button>
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleHumbergerButton}
          >
            <MenuIcon />
          </IconButton> */}
          <IconButton
            onClick={() => router.push("/")}
            size="large"
            color="inherit"
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "block", sm: "block" } }}
            >
              Home
            </Typography>
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {!isAuthenticated ? (
              <>
                <IconButton
                  onClick={() => router.push("/register")}
                  size="large"
                  color="inherit"
                >
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: "none", sm: "block" } }}
                  >
                    Register
                  </Typography>
                </IconButton>
                <IconButton
                  onClick={() => router.push("/login")}
                  size="large"
                  color="inherit"
                >
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: "none", sm: "block" } }}
                  >
                    Login
                  </Typography>
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  size="large"
                  aria-label="show notif on cart"
                  color="inherit"
                  onClick={() => {
                    router.push("/checkout");
                  }}
                >
                  <Badge badgeContent={total} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton onClick={handleLogout} size="large" color="inherit">
                  <LogoutIcon />
                </IconButton>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
