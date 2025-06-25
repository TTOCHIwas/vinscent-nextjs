'use client';

import React from 'react';
import { useUsers } from '@/hooks/use-users';
import { useUIStore } from '@/stores/ui-store';
import MainLayout from '@/components/layout/MainLayout';

export default function TestStatePage() {
  const { data: users, isLoading, error } = useUsers();
  const { addToast } = useUIStore();

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
          <h1 className="text-3xl font-bold mb-8">상태 관리 테스트</h1>
          
          {/* 토스트 테스트 버튼들 */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">토스트 알림 테스트</h2>
            <div className="space-x-4">
              <button
                onClick={() => addToast({ type: 'success', message: '성공 메시지입니다!' })}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                성공 토스트
              </button>
              <button
                onClick={() => addToast({ type: 'error', message: '에러 메시지입니다!' })}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                에러 토스트
              </button>
              <button
                onClick={() => addToast({ type: 'warning', message: '경고 메시지입니다!' })}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
              >
                경고 토스트
              </button>
              <button
                onClick={() => addToast({ type: 'info', message: '정보 메시지입니다!' })}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                정보 토스트
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