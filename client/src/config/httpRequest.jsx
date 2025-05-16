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
authClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Trường hợp lỗi 401 (Unauthorized)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            // Xử lý refresh token ở đây nếu cần
            // Ví dụ: chuyển hướng về login
            localStorage.clear();
        }

        // Trường hợp lỗi 500 (lỗi server)
        if (error.response?.status === 500 && !originalRequest._retry) {
            originalRequest._retry = true;
            localStorage.clear();
        }
        // window.location.reload();
        return Promise.reject(error);
    },
);
