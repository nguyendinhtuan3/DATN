import { apiClient, authClient } from '../config/httpRequest';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * 📌 Lấy danh sách tất cả loại khóa học
 * Không cần truyền dữ liệu đầu vào
 * @returns {Array} - Mảng các loại khóa học
 */
export const fetchCourseTypes = async () => {
  try {
    const response = await authClient.get(`${API_URL}/api/course-types`);
    console.log('fetchCourseTypes Response:', response.data); // Debug
    // Xử lý các định dạng response khác nhau
    if (Array.isArray(response.data)) {
      return response.data; // Trả về mảng trực tiếp
    } else if (response.data && Array.isArray(response.data.data)) {
      return response.data.data; // Trả về mảng từ response.data.data
    } else if (response.data && typeof response.data === 'object') {
      return [response.data]; // Chuyển object đơn lẻ thành mảng
    }
    return []; // Trả về mảng rỗng nếu không có dữ liệu hợp lệ
  } catch (error) {
    console.error('fetchCourseTypes Error:', error);
    throw new Error(error.response?.data?.message || 'Lỗi khi lấy danh sách loại khóa học');
  }
};

/**
 * 📌 Lấy thông tin loại khóa học theo ID
 * @param {string} id - ID của loại khóa học
 */
export const fetchCourseTypeById = async (id) => {
  try {
    const response = await authClient.get(`${API_URL}/api/course-types/${id}`);
    return response.data;
  } catch (error) {
    console.error('fetchCourseTypeById Error:', error);
    throw new Error(error.response?.data?.message || 'Lỗi khi lấy thông tin loại khóa học');
  }
};

/**
 * 📌 Tạo loại khóa học mới
 * @param {Object} data - Dữ liệu cần truyền khi tạo
 * @param {string} data.name - Tên loại khóa học (bắt buộc)
 */
export const createCourseType = async (data) => {
  try {
    const response = await authClient.post(`${API_URL}/api/course-types/add`, data);
    return response.data;
  } catch (error) {
    console.error('createCourseType Error:', error);
    throw new Error(error.response?.data?.message || 'Lỗi khi tạo loại khóa học');
  }
};

/**
 * 📌 Cập nhật loại khóa học theo ID
 * @param {string} id - ID của loại khóa học cần cập nhật
 * @param {Object} data - Dữ liệu cập nhật
 * @param {string} data.name - Tên mới của loại khóa học
 */
export const updateCourseType = async (id, data) => {
  try {
    const response = await authClient.put(`${API_URL}/api/course-types/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('updateCourseType Error:', error);
    throw new Error(error.response?.data?.message || 'Lỗi khi cập nhật loại khóa học');
  }
};

/**
 * 📌 Xóa loại khóa học theo ID
 * @param {string} id - ID của loại khóa học cần xóa
 */
export const deleteCourseType = async (id) => {
  try {
    const response = await authClient.delete(`${API_URL}/api/course-types/${id}`);
    return response.data;
  } catch (error) {
    console.error('deleteCourseType Error:', error);
    throw new Error(error.response?.data?.message || 'Lỗi khi xóa loại khóa học');
  }
};