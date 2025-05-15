// AdminLayout.jsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={collapsed} />
      <div className="flex flex-col flex-1 bg-gray-100">
        <AdminHeader onToggleSidebar={() => setCollapsed(!collapsed)} />
        <div className="flex-1 overflow-auto p-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
