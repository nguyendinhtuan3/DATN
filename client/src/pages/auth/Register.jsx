import React, { useState } from "react";
import InputField from "../../components/student/InputField";
import Button from "../../components/student/Button";
import { registerUser } from "../../api/userApi";

const Register = ({ setIsActive }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Xử lý thay đổi dữ liệu input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Xử lý khi submit form
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Kiểm tra đầu vào cơ bản
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setLoading(true);
    const response = await registerUser({ ...formData, role: "student" });
    setLoading(false);
    if (response?.data?.status) {
      showNotification("Đăng ký thành công!", true);
      setFormData({ name: "", email: "", password: "" });
      if (setIsActive) setIsActive(false);
    } else {
      setError(response?.data?.message);
    }
  };

  return (
    <div className="form-container sign-up">
      <form onSubmit={handleRegister}>
        <h1>Tạo tài khoản</h1>
        <span>hoặc sử dụng email để đăng ký</span>

        <InputField
          type="text"
          name="name"
          placeholder="Tên"
          value={formData.name}
          onChange={handleChange}
        />
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

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <Button
          type="submit"
          text={loading ? "Đang đăng ký..." : "Đăng ký"}
          className="btn-primary"
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default Register;
