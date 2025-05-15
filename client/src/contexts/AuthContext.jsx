import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useUserProfile } from "@/api/userApi";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUsers"; // Sửa từ userApi thành useUsers

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const {
    data: profileData,
    loading,
    error,
    refetch,
  } = useUserProfile({ skip: !token }); // chỉ fetch khi có token

  const user = profileData?.getUserProfile || null;

  const login = useCallback(
    (token) => {
      localStorage.setItem("token", token);
      setToken(token);
      setIsAuthenticated(true);
      refetch(); // Gọi lại profile sau khi login
    },
    [refetch]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    navigate("/login");
  }, [navigate]);

  // Auto logout nếu token không hợp lệ hoặc hết hạn
  useEffect(() => {
    if (token && error) {
      logout();
    }
  }, [error, token, logout]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        refetchProfile: refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook dùng để truy cập AuthContext
export const useAuth = () => useContext(AuthContext);
