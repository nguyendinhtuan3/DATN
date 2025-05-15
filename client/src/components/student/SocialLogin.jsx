import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { loginWithGoogle } from "../../api/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async (response) => {
    if (!response?.credential) {
      toast.error("Không nhận được thông tin từ Google.");
      return;
    }

    setLoading(true);
    try {
      const result = await loginWithGoogle(response.credential);
      const token = result?.data?.googleLogin?.token;
      const user = result?.data?.googleLogin?.user;

      if (!token) {
        throw new Error("Token không tồn tại trong phản hồi từ server.");
      }

      // Lưu token và thông tin người dùng (nếu cần)
      Cookies.set("authToken", token, { expires: 7 });
      if (user) {
        Cookies.set("userInfo", JSON.stringify(user), { expires: 7 });
      }

      toast.success("🎉 Đăng nhập thành công! Đang chuyển hướng...");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.error("Google login error: ", error);
      toast.error("Đăng nhập bằng Google thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="social-icons">
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => toast.error("Đăng nhập thất bại")}
        theme="outline"
        disabled={loading}
      />

      {loading && (
        <p className="text-sm text-gray-500 mt-2 animate-pulse">
          ⏳ Đang xác thực thông tin...
        </p>
      )}
    </div>
  );
};

export default SocialLogin;
