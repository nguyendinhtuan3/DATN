import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, role, requiredRole }) => {
  return role === requiredRole ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
