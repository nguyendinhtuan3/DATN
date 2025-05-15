import { apiClient } from "../config/httpRequest";

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (formData) => {
  const response = await apiClient.post(`${API_URL}/login`, formData);
  return response;
};

export const registerUser = async (formData) => {
  const response = await apiClient.post(`${API_URL}/register`, formData);
  return response;
};
export const updateUser = async (userId, formData) => {
  try {
    const response = await apiClient.put(
      `${API_URL}/users/${userId}`,
      formData
    );
    return response.data; // Trả về data luôn cho tiện dùng
  } catch (error) {
    // Xử lý lỗi nếu cần
    throw error;
  }
};

export const forgotPassword = async (email) => {
  const response = await apiClient.post(`${API_URL}/forgot-password`, {
    email,
  });
  return response;
};

export const resetPassword = async (token, newPassword) => {
  const response = await apiClient.post(`${API_URL}/reset-password`, {
    token,
    newPassword,
  });
  return response;
};

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  const response = await apiClient.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const loginWithGoogle = async (idToken) => {
  const response = await apiClient.post(`${API_URL}/google-login`, { idToken });
  return response.data;
};
