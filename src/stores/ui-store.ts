import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

interface ToastType {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

interface UIState {
  // 모바일 메뉴 상태
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  
  // 모달 상태  
  isModalOpen: boolean;
  modalType: string | null;
  modalData: any;
  openModal: (type: string, data?: any) => void;
  closeModal: () => void;
  
  // 로딩 상태
  isGlobalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
  
  // 🔧 토스트 시스템
  toasts: ToastType[];
  addToast: (toast: Omit<ToastType, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // 모바일 메뉴
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => {
        console.log('🔧 setMobileMenuOpen 호출:', open);
        set({ isMobileMenuOpen: open });
      },
      
      // 모달
      isModalOpen: false,
      modalType: null,
      modalData: null,
      openModal: (type, data) => {
        console.log('🔧 openModal 호출:', type, data);
        set({ 
          isModalOpen: true, 
          modalType: type, 
          modalData: data 
        });
      },
      closeModal: () => {
        console.log('🔧 closeModal 호출');
        set({ 
          isModalOpen: false, 
          modalType: null, 
          modalData: null 
        });
      },
      
      // 글로벌 로딩
      isGlobalLoading: false,
      setGlobalLoading: (loading) => {
        console.log('🔧 setGlobalLoading 호출:', loading);
        set({ isGlobalLoading: loading });
      },
      
      // 🔧 토스트 시스템 (Hydration 안전)
      toasts: [],
      
      addToast: (toast) => {
        console.log('🍞 addToast 호출됨:', toast);
        
        // 🔧 클라이언트에서만 실행되도록 보장
        if (typeof window === 'undefined') {
          console.log('🍞 서버 사이드에서는 토스트 추가 안함');
          return;
        }
        
        const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
        const newToast: ToastType = { ...toast, id };
        
        console.log('🍞 새 토스트 생성:', newToast);
        
        set((state) => {
          const newState = {
            ...state,
            toasts: [...state.toasts, newToast]
          };
          console.log('🍞 store 업데이트:', { 
            이전: state.toasts.length, 
            이후: newState.toasts.length,
            새토스트: newToast
          });
          return newState;
        });
        
        // 자동 제거 (5초)
        setTimeout(() => {
          console.log('🍞 자동 제거 실행:', id);
          get().removeToast(id);
        }, 5000);
      },
      
      removeToast: (id) => {
        console.log('🍞 removeToast 호출됨:', id);
        set((state) => {
          const newToasts = state.toasts.filter(toast => toast.id !== id);
          console.log('🍞 토스트 제거:', { 이전: state.toasts.length, 이후: newToasts.length });
          return { toasts: newToasts };
        });
      },
      
      clearAllToasts: () => {
        console.log('🍞 clearAllToasts 호출됨');
        set({ toasts: [] });
      },
    })),
    {
      name: 'ui-store', // Redux DevTools에서 확인 가능
    }
  )
);

// 🔧 토스트 변화 구독 (클라이언트에서만)
if (typeof window !== 'undefined') {
  useUIStore.subscribe(
    (state) => state.toasts,
    (toasts) => {
      console.log('🍞 토스트 상태 변화 감지:', toasts.length);
    }
  );
}