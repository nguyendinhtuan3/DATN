import axios from 'axios';

// Hàm tạo instance Axios với cấu hình tùy chọn
const createAxiosInstance = (withAuth = false) => {
    return axios.create({
        baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
        withCredentials: withAuth, // Nếu cần gửi cookie với request thì true
    });
};

// Instance dùng chung (không cần auth)
export const apiClient = createAxiosInstance(false);

// Instance dùng cho API cần xác thực (JWT)
export const authClient = createAxiosInstance(false);

// Thêm interceptor cho authClient để tự động thêm header Authorization
authClient.interceptors.request.use(
    (config) => {
        // Lấy token từ localStorage, token được lưu dạng chuỗi thẳng
        const access_token = localStorage.getItem('token');

        if (access_token) {
            // Không dùng JSON.parse vì token là chuỗi JWT thẳng
            config.headers.Authorization = `Bearer ${access_token}`;
        }

        return config;
    },
    (error) => {
        // Xử lý lỗi request
        return Promise.reject(error);
    },
);
