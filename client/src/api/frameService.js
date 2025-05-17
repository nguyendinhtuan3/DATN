import { apiClient, authClient } from '../config/httpRequest';

const API_URL = import.meta.env.VITE_API_URL;

// Lấy tất cả khung học
export const getAllFrames = async () => {
    try {
        const response = await apiClient.get(`${API_URL}/api/frames`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách khung học:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

// Lấy khung học theo ID
export const getFrameById = async (frameId) => {
    try {
        const response = await apiClient.get(`${API_URL}/api/frames/${frameId}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin khung học:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

// Tạo khung học mới (yêu cầu quyền admin)
export const createFrame = async (frameData) => {
    try {
        const response = await authClient.post(`${API_URL}/api/frames`, frameData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo khung học:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

// Cập nhật khung học (yêu cầu quyền admin)
export const updateFrame = async (frameId, frameData) => {
    try {
        const response = await authClient.put(`${API_URL}/api/frames/${frameId}`, frameData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật khung học:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

// Xóa khung học (yêu cầu quyền admin)
export const deleteFrame = async (frameId) => {
    try {
        const response = await authClient.delete(`${API_URL}/api/frames/${frameId}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xóa khung học:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};
