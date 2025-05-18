import React from 'react';
import { NavLink } from 'react-router-dom';
import userAuthStore from '../store/authStore'; // Importing user authentication store
import { minigame } from '../assets'; // Importing a default image asset

const Sidebar = () => {
    // Destructure the user object from the userAuthStore state
    const { user } = userAuthStore();

    // Define the sidebar menu items
    const menu = [
        { label: 'User Management', to: '/admin/users' },
        { label: 'Course Type Management', to: '/admin/type-course' },
        { label: 'Frame Management', to: '/admin/frames' },
        { label: 'Vocabulary Management', to: '/admin/vocabulary' },
        { label: 'Frame Vocabulary Management', to: '/admin/frame-vocabulary' },
        { label: 'Floor1 Management', to: '/admin/floor1' },
        { label: 'Floor2 Management', to: '/admin/floor2' },
        { label: 'Floor3 Management', to: '/admin/floor3' },
    ];

    return (
        // Sidebar container with width and background color styling
        <aside className="w-64 bg-blue-50 p-4">
            {/* User info section: avatar and name */}
            <div className="flex items-center gap-2 mb-4">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-400 relative">
                    {/* Show user avatar if available; otherwise, show default minigame image */}
                    <img src={user.avatar || minigame} alt="avatar preview" className="object-cover w-full h-full" />
                </div>
                {/* Display user's name */}
                <span className="font-semibold">{user.name}</span>
            </div>

            {/* Menu navigation list */}
            <ul className="space-y-2">
                {menu?.map((item) => (
                    <li key={item.to}>
                        {/* NavLink provides styling based on active route */}
                        <NavLink
                            to={item.to}
                            className={({ isActive }) =>
                                `block p-2 rounded ${isActive ? 'bg-blue-100 font-semibold' : 'hover:bg-blue-100'}`
                            }
                        >
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
