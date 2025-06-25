'use client';

import { useUIStore } from '@/stores/ui-store';

export default function Toast() {
  const { toasts, removeToast } = useUIStore();

  console.log('Toast 컴포넌트 렌더링됨, 토스트 개수:', toasts.length);

  return (
    <div 
      className="fixed top-4 right-4 z-[9999] space-y-2"
      style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: 9999
      }}
    >
      {/* 항상 보이는 디버깅 박스 */}
      <div className="bg-black text-white p-2 rounded text-xs opacity-80">
        Toast 렌더링됨 - 개수: {toasts.length}
      </div>
      
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg max-w-sm"
          style={{
            backgroundColor: toast.type === 'success' ? '#10b981' : 
                            toast.type === 'error' ? '#ef4444' :
                            toast.type === 'warning' ? '#f59e0b' : '#3b82f6'
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm">{toast.message}</span>
            <button
              onClick={() => {
                console.log('토스트 제거 클릭:', toast.id);
                removeToast(toast.id);
              }}
              className="ml-3 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}