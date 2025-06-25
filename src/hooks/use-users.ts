import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { User } from '@/types/database';
import { useUIStore } from '@/stores/ui-store';

// 사용자 목록 조회
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get<User[]>('/test/users');
      return response.data || [];
    },
  });
}

// 특정 사용자 조회
export function useUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await api.get<User>(`/users/${userId}`);
      return response.data;
    },
    enabled: !!userId, // userId가 있을 때만 실행
  });
}

// 사용자 정보 업데이트
export function useUpdateUser() {
  const queryClient = useQueryClient();
  const addToast = useUIStore(state => state.addToast);

  return useMutation({
    mutationFn: async (data: { userId: string; updates: Partial<User> }) => {
      const response = await api.patch<User>(`/users/${data.userId}`, data.updates);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // 캐시 업데이트
      queryClient.setQueryData(['user', variables.userId], data);
      queryClient.invalidateQueries({ queryKey: ['users'] });
      
      // 성공 토스트
      addToast({
        type: 'success',
        message: '사용자 정보가 업데이트되었습니다.'
      });
    },
    onError: (error) => {
      // 에러 토스트
      addToast({
        type: 'error',
        message: '업데이트에 실패했습니다.'
      });
    },
  });
}