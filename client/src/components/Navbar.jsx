import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { Menu, MenuItem, Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // <-- import icon
import useAuthStore from "../store/authStore";
import { showNotification } from "../components/showNotification";
import { Logo, minigame } from "../assets";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [towerAnchorEl, setTowerAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const towerOpen = Boolean(towerAnchorEl);
  const { isUserLoggedIn, user, logoutUser } = useAuthStore();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTowerClick = (event) => {
    setTowerAnchorEl(event.currentTarget);
  };

  const handleTowerClose = () => {
    setTowerAnchorEl(null);
  };

  const getNavLinkStyle = ({ isActive }) => ({
    color: isActive ? "white" : "black",
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: "none",
  });

  const handleLogout = () => {
    logoutUser();
    localStorage.clear();
    showNotification("Đăng xuất thành công", true);
  };

  return (
    <nav className="sticky top-0 bg-[#89CA9C] shadow-md z-50">
      <div
        style={{ width: "1152px" }}
        className="mx-auto flex justify-between items-center px-20 py-4 "
      >
        <Link to={"/"} className="text-xl font-bold text-white tracking-wide">
          <img className="w-20" src={Logo} />
        </Link>

        <div className="space-x-6 flex items-center ">
          <NavLink to="/" style={getNavLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/courses" style={getNavLinkStyle}>
            Courses
          </NavLink>

          {/* Menu Tower dạng dropdown với icon mũi tên */}
          <Button
            onClick={handleTowerClick}
            style={{
              color: "black",
              textTransform: "none",
              fontWeight: "normal",
              display: "flex",
              alignItems: "center",
            }}
            endIcon={<ArrowDropDownIcon />}
          >
            Tower
          </Button>
          <Menu
            anchorEl={towerAnchorEl}
            open={towerOpen}
            onClose={handleTowerClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <MenuItem onClick={handleTowerClose} component={Link} to="/level1">
              Floor 1: Picture Matching
            </MenuItem>
            <MenuItem onClick={handleTowerClose} component={Link} to="/level2">
              Floor 2: Maze Lost
            </MenuItem>
            <MenuItem onClick={handleTowerClose} component={Link} to="/level3">
              Floor 3: Listen & Choose
            </MenuItem>
          </Menu>

          <NavLink to="/garden" style={getNavLinkStyle}>
            Garden
          </NavLink>
        </div>

        {isUserLoggedIn ? (
          <div>
            <Button
              onClick={handleClick}
              style={{ color: "white", textTransform: "none", display: "flex" }}
            >
              <img
                src={user.avatar || minigame}
                className="w-8 h-8 rounded-full  "
              />
              <span className="ml-2"> {user.username}</span>
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleClose} component={Link} to="/profile">
                Profile
              </MenuItem>
              {user?.role === "teacher" && (
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/course-management"
                >
                  Course
                </MenuItem>
              )}
              {user?.role === "admin" && (
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/admin/users"
                >
                  User Management
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition duration-200">
              Sign Up
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
