import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const error = urlParams.get("error");
      const token = urlParams.get("token");

      if (error) {
        toast.error("Google từ chối đăng nhập hoặc có lỗi xảy ra.");
        navigate("/login");
        return;
      }

      if (token) {
        localStorage.setItem("authToken", token);
        toast.success("Đăng nhập thành công!");
        navigate("/home");
      } else {
        toast.error("Đã xảy ra lỗi khi đăng nhập.");
        navigate("/login");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="auth-callback text-center mt-10">
      <p className="text-lg font-semibold">⏳ Đang xử lý đăng nhập...</p>
    </div>
  );
};

export default AuthCallback;
