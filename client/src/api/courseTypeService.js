import { apiClient, authClient } from '../config/httpRequest';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * 📌 Lấy danh sách tất cả loại khóa học
 * Không cần truyền dữ liệu đầu vào
 */
export const fetchCourseTypes = async () => {
    const response = await apiClient.get(`${API_URL}/api/course-types`);
    return response.data;
};

/**
 * 📌 Lấy thông tin loại khóa học theo ID
 * @param {string} id - ID của loại khóa học
 */
export const fetchCourseTypeById = async (id) => {
    const response = await apiClient.get(`${API_URL}/api/course-types/${id}`);
    return response.data;
};

/**
 * 📌 Tạo loại khóa học mới
 * @param {Object} data - Dữ liệu cần truyền khi tạo
 * @param {string} data.name - Tên loại khóa học (bắt buộc)
 *
 * Ví dụ:
 * {
 *   name: "Khóa học lập trình"
 * }
 */
export const createCourseType = async (data) => {
    const response = await apiClient.post(`${API_URL}/api/course-types`, data);
    return response.data;
};

/**
 * 📌 Cập nhật loại khóa học theo ID
 * @param {string} id - ID của loại khóa học cần cập nhật
 * @param {Object} data - Dữ liệu cập nhật
 * @param {string} data.name - Tên mới của loại khóa học (có thể giữ nguyên nếu không thay đổi)
 *
 * Ví dụ:
 * {
 *   name: "Khóa học thiết kế"
 * }
 */
export const updateCourseType = async (id, data) => {
    const response = await apiClient.put(`${API_URL}/api/course-types/${id}`, data);
    return response.data;
};

/**
 * 📌 Xóa loại khóa học theo ID
 * @param {string} id - ID của loại khóa học cần xóa
 */
export const deleteCourseType = async (id) => {
    const response = await apiClient.delete(`${API_URL}/api/course-types/${id}`);
    return response.data;
};
