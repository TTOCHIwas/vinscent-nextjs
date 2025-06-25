import { create } from 'zustand';

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
  
  // 토스트 알림
  toasts: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
  }>;
  addToast: (toast: Omit<UIState['toasts'][0], 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  // 모바일 메뉴
  isMobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  
  // 모달
  isModalOpen: false,
  modalType: null,
  modalData: null,
  openModal: (type, data) => set({ 
    isModalOpen: true, 
    modalType: type, 
    modalData: data 
  }),
  closeModal: () => set({ 
    isModalOpen: false, 
    modalType: null, 
    modalData: null 
  }),
  
  // 글로벌 로딩
  isGlobalLoading: false,
  setGlobalLoading: (loading) => set({ isGlobalLoading: loading }),
  
  // 토스트
  toasts: [],
   addToast: (toast) => {
    const id = Math.random().toString(36).substr(2, 9);
    set(state => ({
      toasts: [...state.toasts, { ...toast, id }]
    }));
    
    // 5초 후 자동 제거
    setTimeout(() => {
      get().removeToast(id);
    }, 5000);
  },
  removeToast: (id) => set(state => ({
    toasts: state.toasts.filter(toast => toast.id !== id)
  })),
}));