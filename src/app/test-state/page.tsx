'use client';

import React, { useEffect } from 'react';
import { useUsers } from '@/hooks/use-users';
import { useUIStore } from '@/stores/ui-store';
import MainLayout from '@/components/layout/MainLayout';

export default function TestStatePage() {
  const { data: users, isLoading, error } = useUsers();
  const { addToast, toasts } = useUIStore();

  // 🔧 컴포넌트 마운트 확인
  useEffect(() => {
    console.log('🔧 TestStatePage 컴포넌트 마운트됨');
  }, []);

  // 🔧 기본 렌더링 로그
  console.log('🔧 TestStatePage 렌더링:', { 
    users: users?.length, 
    isLoading, 
    error,
    현재토스트개수: toasts.length,
    토스트목록: toasts
  });

  // 🔧 토스트 상태 변화 추적
  useEffect(() => {
    console.log('🔧 TestStatePage - 토스트 상태 변화:', toasts.length);
  }, [toasts]);

  // 🔧 강화된 테스트 함수
  const handleToastTest = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    console.log(`🔧 ${type} 토스트 버튼 클릭됨!`);
    console.log('🔧 현재 시간:', new Date().toLocaleTimeString());
    console.log('🔧 클릭 전 토스트 개수:', toasts.length);
    console.log('🔧 addToast 함수 타입:', typeof addToast);
    console.log('🔧 호출할 데이터:', { type, message });
    
    try {
      addToast({ type, message: `${message} (${new Date().getTime()})` });
      console.log('🔧 addToast 호출 완료');
      
      // 🔧 호출 후 잠시 후 상태 확인
      setTimeout(() => {
        console.log('🔧 호출 후 토스트 개수:', useUIStore.getState().toasts.length);
      }, 200);
      
    } catch (err) {
      console.error('🔧 addToast 호출 에러:', err);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-lg">TanStack Query 로딩 중...</div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-lg text-red-600">에러 발생: {error.message}</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 py-8" style={{ paddingTop: '120px' }}> {/* 🔧 Toast 공간 확보 */}
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">🔧 토스트 시스템 완전 디버깅</h1>
          
          {/* 🔧 현재 상태 표시 */}
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-8">
            <h3 className="font-bold text-green-800">✅ 실시간 디버깅 정보</h3>
            <p className="text-green-700">현재 토스트 개수: <strong>{toasts.length}개</strong></p>
            <p className="text-green-700">addToast 함수: <strong>{typeof addToast}</strong></p>
            <p className="text-green-700">우측 상단에 검은색 디버깅 박스가 보여야 합니다!</p>
            <p className="text-green-700">브라우저 콘솔(F12)에서 로그를 확인하세요!</p>
          </div>
          
          {/* 토스트 테스트 버튼들 */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">🍞 토스트 알림 테스트</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => handleToastTest('success', '성공 메시지입니다!')}
                className="bg-green-500 text-white px-4 py-3 rounded hover:bg-green-600 transition-colors font-semibold"
              >
                ✅ 성공 토스트
              </button>
              <button
                onClick={() => handleToastTest('error', '에러 메시지입니다!')}
                className="bg-red-500 text-white px-4 py-3 rounded hover:bg-red-600 transition-colors font-semibold"
              >
                ❌ 에러 토스트
              </button>
              <button
                onClick={() => handleToastTest('warning', '경고 메시지입니다!')}
                className="bg-yellow-500 text-white px-4 py-3 rounded hover:bg-yellow-600 transition-colors font-semibold"
              >
                ⚠️ 경고 토스트
              </button>
              <button
                onClick={() => handleToastTest('info', '정보 메시지입니다!')}
                className="bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600 transition-colors font-semibold"
              >
                ℹ️ 정보 토스트
              </button>
            </div>
            
            {/* 🔧 고급 디버깅 도구 */}
            <div className="mt-6 pt-4 border-t">
              <h3 className="font-semibold mb-3 text-gray-800">🔍 고급 디버깅 도구</h3>
              <div className="space-x-2 space-y-2">
                <button
                  onClick={() => {
                    console.log('🔧 === 현재 전체 Store 상태 ===');
                    console.log(useUIStore.getState());
                    alert(`현재 토스트 개수: ${useUIStore.getState().toasts.length}개`);
                  }}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm"
                >
                  🔍 Store 상태 확인
                </button>
                
                <button
                  onClick={() => {
                    const store = useUIStore.getState();
                    console.log('🔧 === 강제 토스트 추가 ===');
                    store.addToast({ type: 'info', message: `강제 추가 토스트 ${Date.now()}` });
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm"
                >
                  🚀 강제 토스트 추가
                </button>
                
                <button
                  onClick={() => {
                    console.log('🔧 === 모든 토스트 제거 ===');
                    useUIStore.getState().clearAllToasts();
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
                >
                  🗑️ 모든 토스트 제거
                </button>
                
                <button
                  onClick={() => {
                    console.log('🔧 === 페이지 새로고침 ===');
                    window.location.reload();
                  }}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
                >
                  🔄 페이지 새로고침
                </button>
              </div>
            </div>
          </div>

          {/* TanStack Query 테스트 (기존 유지) */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">TanStack Query 테스트</h2>
            <p className="text-gray-600 mb-4">
              데이터베이스에서 사용자 목록을 가져와 표시합니다.
            </p>
            
            {users && users.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                  <div key={user.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-gray-600">@{user.tagId}</p>
                    <p className="text-sm text-gray-500">
                      {user.brand === 1 ? '브랜드' : '개인'} 계정
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">사용자 데이터가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}