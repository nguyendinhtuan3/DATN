import { useMutation } from "@tanstack/react-query";
import { loginWithGoogle } from "../api/userApi";

// Đăng nhập bằng Google
export const useLoginWithGoogle = (options = {}) => {
  return useMutation({
    mutationFn: (idToken) => loginWithGoogle(idToken),
    ...options,
  });
};
