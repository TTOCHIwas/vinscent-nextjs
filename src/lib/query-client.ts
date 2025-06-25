import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5분간 캐시 유지
      staleTime: 1000 * 60 * 5,
      // 24시간 후 가비지 컬렉션
      gcTime: 1000 * 60 * 60 * 24,
      // 에러 시 3번 재시도
      retry: 3,
      // 백그라운드에서 자동 리프레시
      refetchOnWindowFocus: false,
    },
    mutations: {
      // 에러 시 1번 재시도
      retry: 1,
    },
  },
});