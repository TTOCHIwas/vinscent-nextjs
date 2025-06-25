'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              향수의 모든 것, Vinscent
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              향수와 뷰티의 모든 것을 공유하는 소셜 플랫폼
            </p>
            
            {session ? (
              <div className="bg-white rounded-lg p-8 shadow-sm max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">
                  환영합니다, {session.user.name}님! 👋
                </h2>
                <div className="space-y-3 text-left">
                  <p className="text-gray-600">
                    <span className="font-medium">태그:</span> @{session.user.tagId}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">타입:</span> {session.user.isBrand ? '브랜드 계정' : '개인 계정'}
                  </p>
                  <div className="pt-4 border-t">
                    <h3 className="font-medium text-gray-900 mb-3">빠른 시작</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <a href="/posts" className="text-blue-600 hover:text-blue-700">
                        📝 게시글 보기
                      </a>
                      <a href="/products" className="text-blue-600 hover:text-blue-700">
                        🧴 제품 탐색
                      </a>
                      <a href="/magazine" className="text-blue-600 hover:text-blue-700">
                        📖 매거진 보기
                      </a>
                      <a href="/search" className="text-blue-600 hover:text-blue-700">
                        🔍 검색하기
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-8 shadow-sm max-w-2xl mx-auto">
                  <h2 className="text-xl font-semibold mb-4">
                    지금 시작해보세요
                  </h2>
                  <p className="text-gray-600 mb-6">
                    향수 애호가들과 브랜드가 함께하는 커뮤니티에 참여하세요.
                  </p>
                  <div className="space-x-4">
                    <a
                      href="/auth/login"
                      className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      로그인
                    </a>
                    <a
                      href="/auth/signup"
                      className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      회원가입
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}