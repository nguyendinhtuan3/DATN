import axios from "axios";

// Hàm tạo instance Axios với các cấu hình tùy chọn
const createAxiosInstance = (withAuth = false) => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
    withCredentials: withAuth, // Bật/tắt gửi cookie
  });
};
// Các instance Axios đặt tên theo thực tế
export const apiClient = createAxiosInstance(); // API chung, không cần auth
export const authClient = createAxiosInstance(true); // API yêu cầu auth (JWT)

// =========== user ============
authClient.interceptors.request.use(
  function (config) {
    const access_token = localStorage.getItem("token");
    if (!access_token) {
      return config;
    }
    config.headers.Authorization = `Bearer ${JSON.parse(access_token)}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
