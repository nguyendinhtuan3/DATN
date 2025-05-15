import React, { useState, useEffect } from "react";
import { minigame } from "../assets";
import { updateUser } from "../api/userApi";
import useAuthStore from "../store/authStore";
import { showNotification } from "../components/showNotification";

function ProfilePage() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    avatarUrl: "", // link avatar hiện tại
  });
  const [avatarFile, setAvatarFile] = useState(null); // file avatar mới upload
  const [avatarPreview, setAvatarPreview] = useState(null); // preview ảnh
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuthStore();
  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      // Hiển thị preview ảnh
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    // Gửi JSON bình thường nếu không thay avatar
    const res = await updateUser(user?.id, {
      username: userData.username,
      email: userData.email,
    });
    setLoading(false);
    showNotification(res.message, res.status);
    if (res.status) {
      setUser(res.user);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-md space-y-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        encType="multipart/form-data"
      >
        <div className="flex flex-col items-center space-y-4">
          <div
            className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-400 cursor-pointer"
            onClick={() => document.getElementById("avatar").click()}
          >
            <img
              src={avatarPreview || minigame}
              alt="avatar preview"
              className="object-cover w-full h-full"
            />
          </div>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Họ tên
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={userData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            placeholder="Nhập họ tên"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            placeholder="Nhập email"
          />
        </div>

        {message && (
          <p
            className={`text-center ${
              message.includes("Lỗi") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white font-semibold ${
            loading
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          } transition`}
        >
          {loading ? "Đang cập nhật..." : "Cập nhật"}
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
