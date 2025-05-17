import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../../components/student/InputField";
import Button from "../../components/student/Button";
import { loginUser } from "../../api/userApi";
import useAuthStore from "../../store/authStore";
import { showNotification } from "../../components/showNotification";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const { setUser, setLoginUser } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(formData);
      const { token, user, status, message } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      setLoginUser();
      if (onLogin) onLogin(user);
      showNotification(message, status);
      if (status) {
        navigate(user.role === "admin" ? "/admin/dashboard" : "/");
        window.location.reload();
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Sai email hoặc mật khẩu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container sign-in">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <span>or use your email password</span>

        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <InputField
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="mb-2">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Quên mật khẩu?
          </Link>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <Button
          text={loading ? "Đang đăng nhập..." : "Đăng nhập"}
          className="btn-primary"
          disabled={loading}
          onClick={handleLogin}
        />
      </form>
    </div>
  );
};

export default Login;
