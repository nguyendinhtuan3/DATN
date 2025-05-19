import React from 'react';
import { NavLink } from 'react-router-dom';
import userAuthStore from '../store/authStore';
import { minigame } from '../assets';

// Menu item configuration for reusability
const menuItems = [
    { label: 'User Management', path: '/admin/users' },
    { label: 'Course Type Management', path: '/admin/type-course' },
    { label: 'Frame Management', path: '/admin/frames' },
    { label: 'Vocabulary Management', path: '/admin/vocabulary' },
    { label: 'Frame Vocabulary Management', path: '/admin/frame-vocabulary' },
    { label: 'Floor1 Management', path: '/admin/floor1' },
    { label: 'Floor2 Management', path: '/admin/floor2' },
    { label: 'Floor3 Management', path: '/admin/floor3' },
];

const Sidebar = () => {
    const { user } = userAuthStore();

    return (
        <aside className="w-64 bg-blue-50 p-6 flex flex-col h-full shadow-md">
            {/* User Profile Section */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-indigo-400">
                    <img
                        src={user?.avatar || minigame}
                        alt={`${user?.name || 'User'}'s avatar`}
                        className="object-cover w-full h-full"
                        loading="lazy"
                    />
                </div>
                <span className="font-semibold text-gray-800 truncate" title={user?.name}>
                    {user?.name || 'Guest'}
                </span>
            </div>

            {/* Navigation Menu */}
            <nav aria-label="Admin Sidebar Navigation">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `block p-3 rounded-md transition-colors duration-200 ${
                                        isActive
                                            ? 'bg-blue-100 text-blue-700 font-semibold'
                                            : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                                    }`
                                }
                                aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
