'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw, Bug, Sparkles } from 'lucide-react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  
  // 🔧 에러 로깅 (향후 Sentry 연동)
  useEffect(() => {
    console.error('🚨 전역 에러 발생:', error);
    
    // TODO: 프로덕션에서는 Sentry 등으로 에러 리포팅
    // Sentry.captureException(error);
  }, [error]);

  // 🔧 에러 타입별 메시지 결정
  const getErrorMessage = () => {
    if (error.message.includes('fetch')) {
      return {
        title: '네트워크 연결 오류',
        description: '서버와 연결할 수 없습니다. 인터넷 연결을 확인해주세요.',
        icon: '🌐'
      };
    }
    
    if (error.message.includes('timeout')) {
      return {
        title: '요청 시간 초과',
        description: '서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.',
        icon: '⏰'
      };
    }
    
    if (error.message.includes('auth')) {
      return {
        title: '인증 오류',
        description: '로그인이 만료되었습니다. 다시 로그인해주세요.',
        icon: '🔐'
      };
    }
    
    return {
      title: '예상치 못한 오류',
      description: '일시적인 문제가 발생했습니다. 페이지를 새로고침하거나 잠시 후 다시 시도해주세요.',
      icon: '⚠️'
    };
  };

  const errorInfo = getErrorMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        
        {/* 🔧 브랜드 로고 */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center space-x-3">
            <Sparkles className="w-12 h-12 text-purple-600" />
            <span className="text-3xl font-bold text-purple-600">Vinscent</span>
          </Link>
        </div>

        {/* 🔧 에러 메인 컨텐츠 */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          
          {/* 아이콘과 제목 */}
          <div className="mb-8">
            <div className="text-6xl md:text-8xl mb-6">{errorInfo.icon}</div>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {errorInfo.title}
            </h1>
          </div>

          {/* 설명 */}
          <div className="mb-8">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              {errorInfo.description}
            </p>
            
            {/* 개발 모드에서만 에러 세부사항 표시 */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-6 p-4 bg-gray-100 rounded-xl text-left">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <Bug className="w-4 h-4 mr-2" />
                  개발자 정보
                </h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <div>
                    <strong>에러 메시지:</strong> {error.message}
                  </div>
                  {error.digest && (
                    <div>
                      <strong>에러 ID:</strong> {error.digest}
                    </div>
                  )}
                  <details className="mt-4">
                    <summary className="cursor-pointer font-semibold">스택 트레이스</summary>
                    <pre className="mt-2 text-xs overflow-auto bg-gray-50 p-2 rounded">
                      {error.stack}
                    </pre>
                  </details>
                </div>
              </div>
            )}
          </div>

          {/* 🔧 액션 버튼들 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            
            {/* 다시 시도 */}
            <button
              onClick={reset}
              className="flex items-center justify-center space-x-3 bg-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors group"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>다시 시도</span>
            </button>

            {/* 홈으로 가기 */}
            <Link
              href="/"
              className="flex items-center justify-center space-x-3 bg-white text-purple-600 border-2 border-purple-600 px-6 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>홈으로 가기</span>
            </Link>

          </div>

          {/* 🔧 추가 도움말 링크 */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500 mb-4">문제가 계속 발생하나요?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/support"
                className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
              >
                고객 지원 센터
              </Link>
              <Link
                href="/help"
                className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
              >
                도움말
              </Link>
              <Link
                href="/status"
                className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
              >
                서비스 상태
              </Link>
            </div>
          </div>

        </div>

        {/* 🔧 하단 안내 메시지 */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            오류 보고서가 자동으로 개발팀에 전송되었습니다.
            <br />
            빠른 시일 내에 문제를 해결하도록 하겠습니다.
          </p>
        </div>

      </div>
    </div>
  );
}