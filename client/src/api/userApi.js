import { apiClient, authClient } from "../config/httpRequest";

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (formData) => {
  const response = await apiClient.post(`${API_URL}/api/login`, formData);
  return response;
};

export const registerUser = async (formData) => {
  const response = await apiClient.post(`${API_URL}/api/register`, formData);
  return response;
};
export const updateUser = async (userId, formData) => {
  try {
    const response = await apiClient.put(
      `${API_URL}/api/users/${userId}`,
      formData
    );
    return response.data; // Trả về data luôn cho tiện dùng
  } catch (error) {
    // Xử lý lỗi nếu cần
    throw error;
  }
};

export const forgotPassword = async (email) => {
  const response = await apiClient.post(`${API_URL}/api/forgot-password`, {
    email,
  });
  return response;
};

export const resetPassword = async (token, newPassword) => {
  const response = await apiClient.post(`${API_URL}/api/reset-password`, {
    token,
    newPassword,
  });
  return response;
};

export const getUserProfile = async () => {
  const response = await authClient.get(`${API_URL}/api/profile`);
  return response.data;
};

export const loginWithGoogle = async (idToken) => {
  const response = await apiClient.post(`${API_URL}/api/google-login`, {
    idToken,
  });
  return response.data;
};
// 🔒 Lấy danh sách người dùng (có tìm kiếm & phân trang)
export const getAllUsers = async ({ search = "", page = 1, limit = 10 }) => {
  const response = await authClient.get(`${API_URL}/api/users/all`, {
    params: { search, page, limit },
  });
  return response.data;
};

// 📋 Lấy chi tiết người dùng
export const getUserDetail = async (userId) => {
  const response = await authClient.get(
    `${API_URL}/api/users/${userId}/detail`
  );
  return response.data;
};

// ➕ Thêm người dùng mới
export const addUser = async (formData) => {
  const response = await authClient.post(`${API_URL}/api/users/add`, formData);
  return response.data;
};

// ✏️ Cập nhật người dùng
export const updateUserByAdmin = async (userId, formData) => {
  const response = await authClient.put(
    `${API_URL}/api/users/${userId}/update`,
    formData
  );
  return response.data;
};

// 🗑️ Xoá người dùng
export const deleteUser = async (userId) => {
  const response = await authClient.delete(
    `${API_URL}/api/users/${userId}/delete`
  );
  return response.data;
};
