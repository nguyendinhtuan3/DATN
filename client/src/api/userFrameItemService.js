import { apiClient, authClient } from '../config/httpRequest';

const API_URL = import.meta.env.VITE_API_URL;

// Lấy tất cả trạng thái ô của người dùng
export const getAllUserFrameItems = async () => {
    try {
        const response = await authClient.get(`${API_URL}/api/user-frame-items`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách trạng thái ô:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

// Lấy trạng thái ô theo ID
export const getUserFrameItemById = async (itemId) => {
    try {
        const response = await authClient.get(`${API_URL}/api/user-frame-items/${itemId}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin trạng thái ô:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

// Tạo trạng thái ô mới
export const createUserFrameItem = async (itemData) => {
    try {
        const response = await apiClient.post(`${API_URL}/api/user-frame-items`, itemData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo trạng thái ô:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};
// update & create
export const updateUserFrameItem = async (itemId, data) => {
    try {
        const response = await authClient.put(`${API_URL}/api/user-frame-items/${itemId}`, data);
        return response.data;
    } catch (error) {
        console.error('Lõi khi cập nhật trạng thái ô:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lõi khi gọi API' };
    }
};
// Xóa trạng thái ô (yêu cầu quyền admin)
export const deleteUserFrameItem = async (itemId) => {
    try {
        const response = await authClient.delete(`${API_URL}/api/user-frame-items/${itemId}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xóa trạng thái ô:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};
