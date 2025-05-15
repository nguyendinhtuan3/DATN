import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUsers,
  registerUser,
  loginUser,
  googleLoginUser,
  getUserProfile,
  softDeleteUser,
  updateUserStatus,
  logoutUser,
} from "../api/userApi";

// Lấy danh sách người dùng (cho Admin)
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

// Lấy thông tin người dùng đang đăng nhập
export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 5, // cache 5 phút
  });
};

// Đăng ký
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

// Đăng nhập thường
export const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile"]);
    },
  });
};

// Đăng nhập bằng Google
export const useGoogleLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: googleLoginUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile"]);
    },
  });
};

// Logout
export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries(["userProfile"]);
      queryClient.removeQueries(["users"]);
    },
  });
};

// Khóa/Mở khóa tài khoản
export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};

// Xoá mềm tài khoản
export const useSoftDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: softDeleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
