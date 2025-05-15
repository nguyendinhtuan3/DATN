import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const AdminHeader = ({ adminName = "Admin", onLogout }) => {
  return (
    <header className="bg-white border-b px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="text-xl font-semibold text-gray-800">Dashboard</div>

      <div className="flex items-center gap-4">
        {/* Notification icon */}
        <button
          className="text-gray-600 hover:text-blue-600 transition"
          title="Notifications"
        >
          <FaBell size={18} />
        </button>

        {/* Admin name and avatar */}
        <div className="flex items-center gap-2 text-gray-700">
          <FaUserCircle size={24} className="text-blue-500" />
          <span className="hidden sm:inline">{adminName}</span>
        </div>

        {/* Logout button */}
        <button
          onClick={onLogout || (() => console.log("Logging out..."))}
          className="text-gray-600 hover:text-red-500 transition"
          title="Logout"
        >
          <FaSignOutAlt size={18} />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
