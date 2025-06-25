'use client';

import { useUIStore } from '@/stores/ui-store';
import { useEffect, useState } from 'react';

export default function Toast() {
  const { toasts, removeToast } = useUIStore();
  const [isClient, setIsClient] = useState(false);
  const [debugTime, setDebugTime] = useState<string>('');

  // 🔧 클라이언트에서만 실행되도록 보장
  useEffect(() => {
    setIsClient(true);
    setDebugTime(new Date().toLocaleTimeString());
    
    // 시간 업데이트 (디버깅용)
    const timer = setInterval(() => {
      setDebugTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 🔧 toasts 변화 추적 (클라이언트에서만)
  useEffect(() => {
    if (isClient) {
      console.log('🍞 Toast useEffect - toasts 변화:', toasts);
    }
  }, [toasts, isClient]);

  // 🔧 컴포넌트 마운트 확인
  useEffect(() => {
    console.log('🍞 Toast 컴포넌트 마운트됨');
    return () => {
      console.log('🍞 Toast 컴포넌트 언마운트됨');
    };
  }, []);

  // 🔧 서버 사이드에서는 기본 구조만 렌더링
  if (!isClient) {
    return (
      <div className="fixed top-4 right-4 z-[9999] space-y-2">
        {/* 서버 사이드에서는 정적 요소만 */}
        <div className="bg-black text-white p-3 rounded text-xs font-mono border-2 border-yellow-400">
          <div>🍞 Toast Loading...</div>
        </div>
      </div>
    );
  }

  // 🔧 클라이언트에서만 실행되는 로깅
  console.log('🍞 Toast 컴포넌트 렌더링 (Client):', {
    토스트개수: toasts.length,
    토스트목록: toasts,
    시간: debugTime
  });

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2">
      {/* 🔧 클라이언트에서만 보이는 디버깅 정보 */}
      <div className="bg-black text-white p-3 rounded text-xs font-mono border-2 border-yellow-400">
        <div>🍞 Toast Debug Info</div>
        <div>컴포넌트: ✅ 클라이언트 렌더링</div>
        <div>토스트 개수: {toasts.length}개</div>
        <div>시간: {debugTime}</div>
        {toasts.length > 0 && (
          <div className="mt-2 text-yellow-200">
            최근 토스트: {toasts[toasts.length - 1]?.message?.substring(0, 20)}...
          </div>
        )}
      </div>
      
      {/* 🔧 실제 토스트들 */}
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className={`
            px-4 py-3 rounded-lg shadow-lg max-w-sm transform transition-all duration-300
            animate-slide-in-right
            ${toast.type === 'success' ? 'bg-green-500 text-white' : ''}
            ${toast.type === 'error' ? 'bg-red-500 text-white' : ''}
            ${toast.type === 'warning' ? 'bg-yellow-500 text-white' : ''}
            ${toast.type === 'info' ? 'bg-blue-500 text-white' : ''}
          `}
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">{toast.message}</div>
              <div className="text-xs opacity-80 mt-1">ID: {toast.id.substring(0, 8)}...</div>
            </div>
            <button
              onClick={() => {
                console.log('🍞 토스트 닫기 버튼 클릭:', toast.id);
                removeToast(toast.id);
              }}
              className="ml-3 text-white hover:text-gray-200 transition-colors"
              aria-label="토스트 닫기"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}