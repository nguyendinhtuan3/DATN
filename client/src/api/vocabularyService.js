import { apiClient, authClient } from '../config/httpRequest';

const API_URL = import.meta.env.VITE_API_URL;

// Lấy tất cả từ vựng
export const getAllVocabularies = async () => {
    try {
        const response = await apiClient.get(`${API_URL}/api/vocabularies`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách từ vựng:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

// Lấy từ vựng theo ID
export const getVocabularyById = async (vocabId) => {
    try {
        const response = await apiClient.get(`${API_URL}/api/vocabularies/${vocabId}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin từ vựng:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

// Tạo từ vựng mới (yêu cầu quyền admin)
export const createVocabulary = async (vocabData) => {
    try {
        const response = await authClient.post(`${API_URL}/api/vocabularies`, vocabData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo từ vựng:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

// Cập nhật từ vựng (yêu cầu quyền admin)
export const updateVocabulary = async (vocabId, vocabData) => {
    try {
        const response = await authClient.put(`${API_URL}/api/vocabularies/${vocabId}`, vocabData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật từ vựng:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

// Xóa từ vựng (yêu cầu quyền admin)
export const deleteVocabulary = async (vocabId) => {
    try {
        const response = await authClient.delete(`${API_URL}/api/vocabularies/${vocabId}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xóa từ vựng:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};
