'use client';

import { useUIStore } from '@/stores/ui-store';
import { useEffect } from 'react';

export default function Toast() {
  const { toasts, removeToast } = useUIStore();

  // 🔧 컴포넌트 마운트 확인 (가장 중요!)
  useEffect(() => {
    console.log('🍞 Toast 컴포넌트 마운트됨 - 이 로그가 보여야 함!');
    return () => {
      console.log('🍞 Toast 컴포넌트 언마운트됨');
    };
  }, []);

  // 🔧 toasts 변화 추적
  useEffect(() => {
    console.log('🍞 Toast useEffect - toasts 변화:', toasts.length, toasts);
  }, [toasts]);

  // 🔧 강제 렌더링 확인
  console.log('🍞 Toast 컴포넌트 렌더링됨 - 토스트 개수:', toasts.length);

  return (
    <>
      {/* 🔧 항상 보이는 고정 디버깅 박스 (절대 위치) */}
      <div 
        className="fixed top-4 right-4 z-[99999] bg-black text-white p-3 rounded text-xs font-mono border-2 border-yellow-400"
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 99999,
          backgroundColor: '#000',
          color: '#fff',
          padding: '12px',
          borderRadius: '6px',
          border: '2px solid #fbbf24',
          fontSize: '12px',
          fontFamily: 'monospace',
          maxWidth: '300px'
        }}
      >
        <div>🍞 Toast Component Status</div>
        <div>✅ Component Mounted</div>
        <div>🔢 Toast Count: {toasts.length}</div>
        <div>📅 Time: {new Date().toLocaleTimeString()}</div>
        {toasts.length > 0 && (
          <div style={{ marginTop: '8px', color: '#fbbf24' }}>
            Last: {toasts[toasts.length - 1]?.message?.substring(0, 15)}...
          </div>
        )}
      </div>

      {/* 🔧 실제 토스트들 - 다른 위치에 렌더링 */}
      <div 
        className="fixed top-20 right-4 z-[99998] space-y-2"
        style={{
          position: 'fixed',
          top: '80px', // 디버깅 박스 아래로
          right: '16px',
          zIndex: 99998
        }}
      >
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className="px-4 py-3 rounded-lg shadow-lg max-w-sm transition-all duration-300"
            style={{
              backgroundColor: toast.type === 'success' ? '#10b981' : 
                              toast.type === 'error' ? '#ef4444' :
                              toast.type === 'warning' ? '#f59e0b' : '#3b82f6',
              color: '#ffffff',
              padding: '12px 16px',
              borderRadius: '8px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              maxWidth: '20rem',
              transform: `translateY(${index * 8}px)`, // 살짝 겹치게
              position: 'relative',
              zIndex: 99998 - index
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>{toast.message}</div>
                <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>
                  ID: {toast.id.substring(0, 8)}... | Type: {toast.type}
                </div>
              </div>
              <button
                onClick={() => {
                  console.log('🍞 토스트 닫기 버튼 클릭:', toast.id);
                  removeToast(toast.id);
                }}
                style={{
                  marginLeft: '12px',
                  color: '#ffffff',
                  background: 'none',
                  border: 'none',
                  fontSize: '16px',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                aria-label="토스트 닫기"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}