import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ element, requiredRole }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Hiển thị trạng thái xác thực
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  // Chưa đăng nhập → Chuyển đến trang login và giữ lại nơi đang đến
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Kiểm tra quyền truy cập
  const hasAccess = Array.isArray(requiredRole)
    ? requiredRole.includes(user?.role)
    : user?.role === requiredRole || !requiredRole;

  if (!hasAccess) {
    return (
      <div className="text-center py-10 text-red-500 font-semibold text-xl">
        🚫 Bạn không có quyền truy cập trang này.
      </div>
    );
  }

  return element;
};

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
  requiredRole: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default PrivateRoute;
