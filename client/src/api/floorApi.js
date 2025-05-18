import { apiClient, authClient } from '../config/httpRequest';

const API_URL = import.meta.env.VITE_API_URL;

// Tầng 3: Listen & Choose API
export const getAllFloor3Questions = async () => {
    try {
        const response = await apiClient.get(`${API_URL}/api/floor3`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy tất cả câu hỏi Tầng 3:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

export const getFloor3QuestionById = async (id) => {
    try {
        const response = await apiClient.get(`${API_URL}/api/floor3/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy câu hỏi Tầng 3 theo ID:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

export const createFloor3Question = async (questionData) => {
    try {
        const response = await authClient.post(`${API_URL}/api/floor3`, questionData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo câu hỏi Tầng 3:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

export const updateFloor3Question = async (id, questionData) => {
    try {
        const response = await authClient.put(`${API_URL}/api/floor3/${id}`, questionData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật câu hỏi Tầng 3:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

export const deleteFloor3Question = async (id) => {
    try {
        const response = await authClient.delete(`${API_URL}/api/floor3/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xóa câu hỏi Tầng 3:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

export const getFloor3Question = async () => {
    try {
        const response = await apiClient.get(`${API_URL}/api/floor3`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy câu hỏi ngẫu nhiên Tầng 3:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

// Tầng 2: Maze Popup API
export const getAllFloor2Questions = async () => {
    try {
        const response = await apiClient.get(`${API_URL}/api/floor2`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy tất cả câu hỏi Tầng 2:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

export const getFloor2QuestionById = async (id) => {
    try {
        const response = await apiClient.get(`${API_URL}/api/floor2/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy câu hỏi Tầng 2 theo ID:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

export const createFloor2Question = async (questionData) => {
    try {
        const response = await authClient.post(`${API_URL}/api/floor2`, questionData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo câu hỏi Tầng 2:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

export const updateFloor2Question = async (id, questionData) => {
    try {
        const response = await authClient.put(`${API_URL}/api/floor2/${id}`, questionData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật câu hỏi Tầng 2:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

export const deleteFloor2Question = async (id) => {
    try {
        const response = await authClient.delete(`${API_URL}/api/floor2/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xóa câu hỏi Tầng 2:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

export const getRandomFloor2Question = async () => {
    try {
        const response = await apiClient.get(`${API_URL}/api/floor2/random`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy câu hỏi ngẫu nhiên Tầng 2:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

// Tầng 1: Picture Matching API
export const getAllFloor1Questions = async () => {
    try {
        const response = await apiClient.get(`${API_URL}/api/floor1`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy tất cả câu hỏi Tầng 1:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

export const getFloor1QuestionById = async (id) => {
    try {
        const response = await apiClient.get(`${API_URL}/api/floor1/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy câu hỏi Tầng 1 theo ID:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

export const createFloor1Question = async (questionData) => {
    try {
        const response = await authClient.post(`${API_URL}/api/floor1`, questionData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo câu hỏi Tầng 1:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

export const updateFloor1Question = async (id, questionData) => {
    try {
        const response = await authClient.put(`${API_URL}/api/floor1/${id}`, questionData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật câu hỏi Tầng 1:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

export const deleteFloor1Question = async (id) => {
    try {
        const response = await authClient.delete(`${API_URL}/api/floor1/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xóa câu hỏi Tầng 1:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};

export const getFloor1Question = async () => {
    try {
        const response = await apiClient.get(`${API_URL}/api/floor1`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy câu hỏi ngẫu nhiên Tầng 1:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};
