import { apiClient, authClient } from '../config/httpRequest';

const API_URL = import.meta.env.VITE_API_URL;


// 📌 Fetch lessons for courses created by the teacher
export const getMyCreatedLessons = async () => {
    try {
        const response = await authClient.post(`${API_URL}/api/lessons/my-created-lessons`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách bài học:', error);
        throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
    }
};
// 📌 Lấy danh sách bài học (có tìm kiếm & phân trang)
export const getLessons = async () => {
  try {
    const response = await apiClient.get(`${API_URL}/api/lessons/all`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bài học:', error);
    throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
  }
};

// 📌 Lấy chi tiết bài học
export const getLessonDetail = async (id) => {
  try {
    const response = await apiClient.get(`${API_URL}/api/lessons/${id}/detail`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết bài học:', error);
    throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
  }
};

// 📌 Thêm bài học (yêu cầu quyền admin)
export const addLesson = async (lessonData) => {
  try {
    const response = await authClient.post(`${API_URL}/api/lessons/add`, lessonData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm bài học:', error);
    throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
  }
};

// 📌 Cập nhật bài học (yêu cầu quyền admin)
export const updateLesson = async (id, lessonData) => {
  try {
    const response = await authClient.put(`${API_URL}/api/lessons/${id}/update`, lessonData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật bài học:', error);
    throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
  }
};

// 📌 Xóa bài học (yêu cầu quyền admin)
export const deleteLesson = async (id) => {
  try {
    const response = await authClient.delete(`${API_URL}/api/lessons/${id}/delete`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa bài học:', error);
    throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
  }
};

// 📌 Lấy danh sách bài học theo course_id (có phân trang & tìm kiếm)
export const getLessonsByCourse = async (courseId, { search = '', page = 1, limit = 10 } = {}) => {
  try {
    const response = await apiClient.get(`${API_URL}/api/lessons/by-course/${courseId}`, {
      params: { search, page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bài học theo khóa học:', error);
    throw error.response?.data || { status: false, message: 'Đã xảy ra lỗi khi gọi API' };
  }
};