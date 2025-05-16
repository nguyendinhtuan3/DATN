import { apiClient, authClient } from '../config/httpRequest';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * 📌 Lấy danh sách tất cả khóa học
 * Không cần truyền dữ liệu đầu vào
 */
export const fetchAllCourses = async (courseTypeId) => {
    const params = courseTypeId ? { courseTypeId } : {};
    const response = await apiClient.get(`${API_URL}/api/courses`, { params });
    return response.data;
};

/**
 * 📌 Lấy chi tiết một khóa học theo ID
 * @param {string|number} id - ID của khóa học
 */
export const fetchCourseById = async (id) => {
    const response = await apiClient.get(`${API_URL}/api/courses/${id}`);
    return response.data;
};

/**
 * 📌 Lấy danh sách khóa học của người dùng hiện tại (cần đăng nhập)
 */
export const fetchMyCourses = async () => {
    const response = await authClient.get(`${API_URL}/api/courses/my-courses`);
    return response.data;
};

/**
 * 📌 Tạo mới một khóa học (chỉ dành cho teacher hoặc admin)
 * @param {object} courseData - Dữ liệu khóa học
 */
export const createCourse = async (courseData) => {
    const response = await authClient.post(`${API_URL}/api/courses`, courseData);
    return response.data;
};

/**
 * 📌 Cập nhật thông tin một khóa học theo ID (chỉ dành cho teacher hoặc admin)
 * @param {string|number} id - ID của khóa học
 * @param {object} courseData - Dữ liệu cập nhật
 */
export const updateCourse = async (id, courseData) => {
    const response = await authClient.put(`${API_URL}/api/courses/${id}`, courseData);
    return response.data;
};

/**
 * 📌 Xóa một khóa học theo ID (chỉ dành cho teacher hoặc admin)
 * @param {string|number} id - ID của khóa học
 */
export const deleteCourse = async (id) => {
    const response = await authClient.delete(`${API_URL}/api/courses/${id}`);
    return response.data;
};
