import axios from 'axios';
import { ApiResponse } from '@/types/database';

// Axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (인증 토큰 자동 추가)
apiClient.interceptors.request.use(
  (config) => {
    // 여기서 인증 토큰을 자동으로 추가할 수 있음
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 공통 에러 처리
    if (error.response?.status === 401) {
      // 인증 오류 - 로그인 페이지로 리다이렉트
      window.location.href = '/auth/login';
    }
    
    if (error.response?.status === 500) {
      // 서버 오류
      console.error('서버 오류:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

// API 함수들
export const api = {
  // GET 요청
  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    const response = await apiClient.get(url);
    return response.data;
  },

  // POST 요청
  post: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    const response = await apiClient.post(url, data);
    return response.data;
  },

  // PUT 요청
  put: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    const response = await apiClient.put(url, data);
    return response.data;
  },

  // DELETE 요청
  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    const response = await apiClient.delete(url);
    return response.data;
  },

  // PATCH 요청
  patch: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    const response = await apiClient.patch(url, data);
    return response.data;
  },
};

export default api;