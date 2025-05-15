import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 phút
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default queryClient;
