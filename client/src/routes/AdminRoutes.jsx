import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/admin/Dashboard";
import UserManagement from "../pages/admin/UserManagement";
import PrivateRoute from "./PrivateRoute";

const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/users",
    element: <UserManagement />,
  },
  // Có thể thêm nhiều route khác sau này
];

const AdminRoutes = ({ role }) => {
  return (
    <Routes>
      {adminRoutes.map(({ path, element }, index) => (
        <Route
          key={index}
          path={path}
          element={
            <PrivateRoute element={element} role={role} requiredRole="admin" />
          }
        />
      ))}
    </Routes>
  );
};

export default AdminRoutes;
