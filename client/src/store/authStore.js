import { create } from "zustand";

const useAuthStore = create((set) => ({
  // Lấy trạng thái login từ localStorage khi khởi tạo
  isUserLoggedIn: JSON.parse(localStorage.getItem("isUserLoggedIn") || "false"),
  user: JSON.parse(localStorage.getItem("user") || "false"),
  // Đăng nhập người dùng
  setLoginUser: () => {
    localStorage.setItem("isUserLoggedIn", "true");
    set({ isUserLoggedIn: true });
  },
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  // Đăng xuất người dùng
  logoutUser: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userVouchers");
    localStorage.removeItem("user");
    set({ isUserLoggedIn: false, user: {} });
  },
}));

export default useAuthStore;
