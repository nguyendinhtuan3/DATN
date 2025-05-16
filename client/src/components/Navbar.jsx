import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { Menu, MenuItem, Button } from '@mui/material';
import useAuthStore from '../store/authStore';
import { showNotification } from '../components/showNotification';
import { Logo, minigame } from '../assets';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { isUserLoggedIn, user, logoutUser } = useAuthStore();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getNavLinkStyle = ({ isActive }) => ({
        color: isActive ? 'white' : 'black',
        fontWeight: isActive ? 'bold' : 'normal',
        textDecoration: 'none',
    });

    const handleLogout = () => {
        logoutUser();
        showNotification('Đăng xuất thành công', true);
    };

    return (
        <nav className="sticky top-0 bg-[#89CA9C] shadow-md z-50">
            <div style={{ width: '1152px' }} className="mx-auto flex justify-between items-center px-20 py-4 ">
                <Link to={'/'} className="text-xl font-bold text-white tracking-wide">
                    <img className="w-20" src={Logo} />
                </Link>

                <div className="space-x-6 flex items-center ">
                    <NavLink to="/" style={getNavLinkStyle}>
                        Home
                    </NavLink>
                    <NavLink to="/courses" style={getNavLinkStyle}>
                        Courses
                    </NavLink>
                    <NavLink to="/tower" style={getNavLinkStyle}>
                        Tower
                    </NavLink>
                    <NavLink to="/garden" style={getNavLinkStyle}>
                        Garden
                    </NavLink>

                    <NavLink to="/testing" style={getNavLinkStyle}>
                        Testing
                    </NavLink>
                </div>

                {isUserLoggedIn ? (
                    <div>
                        <Button
                            onClick={handleClick}
                            style={{ color: 'white', textTransform: 'none', display: 'flex' }}
                        >
                            <img src={user.avatar || minigame} className="w-8 h-8 rounded-full  " />
                            {}
                            <span className="ml-2"> {user.username}</span>
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            <MenuItem onClick={handleClose} component={Link} to="/profile">
                                Profile
                            </MenuItem>
                            {user?.role === 'teacher' && (
                                <MenuItem onClick={handleClose} component={Link} to="/course-management">
                                    Course
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
