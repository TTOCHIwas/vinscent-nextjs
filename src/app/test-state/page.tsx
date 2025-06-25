// 🔧 test-state/page.tsx 최소 수정 버전
'use client';

import React from 'react';
import { useUsers } from '@/hooks/use-users';
import { useUIStore } from '@/stores/ui-store';
import MainLayout from '@/components/layout/MainLayout';

export default function TestStatePage() {
  const { data: users, isLoading, error } = useUsers();
  const { addToast, toasts } = useUIStore(); // 🔧 toasts 추가

  // 🔧 기본 렌더링 로그
  console.log('🔧 TestStatePage 렌더링:', { 
    users: users?.length, 
    isLoading, 
    error,
    현재토스트개수: toasts.length // 🔧 토스트 개수 확인
  });

  // 🔧 간단한 테스트 함수
  const handleToastTest = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    console.log(`🔧 ${type} 토스트 버튼 클릭됨!`);
    console.log('🔧 addToast 함수 타입:', typeof addToast);
    console.log('🔧 호출할 데이터:', { type, message });
    
    try {
      addToast({ type, message });
      console.log('🔧 addToast 호출 완료');
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
      <div className="bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">🔧 상태 관리 테스트</h1>
          
          {/* 🔧 현재 상태 표시 */}
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8">
            <h3 className="font-bold text-yellow-800">실시간 디버깅 정보</h3>
            <p className="text-yellow-700">현재 토스트 개수: <strong>{toasts.length}개</strong></p>
            <p className="text-yellow-700">addToast 함수: <strong>{typeof addToast}</strong></p>
            <p className="text-yellow-700">브라우저 콘솔(F12)을 확인하세요!</p>
          </div>
          
          {/* 토스트 테스트 버튼들 */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">🍞 토스트 알림 테스트</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => handleToastTest('success', '성공 메시지입니다!')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                ✅ 성공 토스트
              </button>
              <button
                onClick={() => handleToastTest('error', '에러 메시지입니다!')}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                ❌ 에러 토스트
              </button>
              <button
                onClick={() => handleToastTest('warning', '경고 메시지입니다!')}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
              >
                ⚠️ 경고 토스트
              </button>
              <button
                onClick={() => handleToastTest('info', '정보 메시지입니다!')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                ℹ️ 정보 토스트
              </button>
            </div>
            
            {/* 🔧 추가 테스트 */}
            <div className="mt-4 pt-4 border-t">
              <button
                onClick={() => {
                  console.log('🔧 직접 store 상태 확인');
                  console.log('🔧 useUIStore.getState():', useUIStore.getState());
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
              >
                🔍 Store 상태 직접 확인
              </button>
              
              <button
                onClick={() => {
                  console.log('🔧 강제 리렌더링 테스트');
                  window.location.reload();
                }}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                🔄 페이지 새로고침
              </button>
            </div>
          </div>

          {/* TanStack Query 테스트 */}
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