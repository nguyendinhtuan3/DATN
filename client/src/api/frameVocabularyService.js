import { apiClient, authClient } from '../config/httpRequest';

const API_URL = import.meta.env.VITE_API_URL;

// Lấy tất cả quan hệ khung-từ vựng
export const getAllFrameVocabularies = async () => {
    try {
        const response = await apiClient.get(`${API_URL}/api/frame-vocabularies`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách quan hệ khung-từ vựng:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

// Lấy quan hệ khung-từ vựng theo ID
export const getFrameVocabularyById = async (frameVocabId) => {
    try {
        const response = await apiClient.get(`${API_URL}/api/frame-vocabularies/by-frame/${frameVocabId}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin quan hệ khung-từ vựng:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

// Tạo quan hệ khung-từ vựng mới (yêu cầu quyền admin)
export const createFrameVocabulary = async (frameVocabData) => {
    try {
        const response = await authClient.post(`${API_URL}/api/frame-vocabularies`, frameVocabData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo quan hệ khung-từ vựng:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

// Cập nhật quan hệ khung-từ vựng (yêu cầu quyền admin)
export const updateFrameVocabulary = async (frameVocabId, frameVocabData) => {
    try {
        const response = await authClient.put(`${API_URL}/api/frame-vocabularies/${frameVocabId}`, frameVocabData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật quan hệ khung-từ vựng:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

// Xóa quan hệ khung-từ vựng (yêu cầu quyền admin)
export const deleteFrameVocabulary = async (frameVocabId) => {
    try {
        const response = await authClient.delete(`${API_URL}/api/frame-vocabularies/${frameVocabId}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xóa quan hệ khung-từ vựng:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};
