import { NavLink } from "react-router-dom";
import {
  FaUsers,
  FaBook,
  FaGift,
  FaMoneyBill,
  FaBullhorn,
  FaBars,
} from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { to: "/admin/user-management", label: "Users", icon: <FaUsers /> },
    { to: "/admin/course-management", label: "Courses", icon: <FaBook /> },
    { to: "/admin/reward-management", label: "Rewards", icon: <FaGift /> },
    {
      to: "/admin/payment-management",
      label: "Payments",
      icon: <FaMoneyBill />,
    },
    {
      to: "/admin/notification-management",
      label: "Notifications",
      icon: <FaBullhorn />,
    },
  ];

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-white border-r shadow-sm h-full transition-all duration-300`}
    >
      {/* Header with toggle */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="font-bold text-lg whitespace-nowrap">Admin Panel</div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-600 hover:text-blue-600"
        >
          <FaBars />
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex flex-col space-y-1 p-3">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md group transition-colors duration-200
              ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <span className="text-lg group-hover:text-blue-500">{icon}</span>
            {!collapsed && <span className="whitespace-nowrap">{label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
