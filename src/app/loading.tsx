import { Sparkles } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 flex items-center justify-center">
      <div className="text-center">
        
        {/* 🔧 브랜드 로고 + 로딩 애니메이션 */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Sparkles className="w-16 h-16 text-purple-600 animate-pulse" />
            
            {/* 회전하는 외곽 링 */}
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-300 rounded-full animate-spin"></div>
            
            {/* 페이드 인/아웃 하는 내부 링 */}
            <div className="absolute inset-2 w-12 h-12 border-2 border-transparent border-b-pink-300 rounded-full animate-spin animate-reverse"></div>
          </div>
        </div>

        {/* 🔧 로딩 텍스트 */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-purple-600">Vinscent</h2>
          
          {/* 점진적으로 나타나는 점들 */}
          <div className="flex justify-center items-center space-x-1">
            <span className="text-gray-600 font-medium">로딩 중</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>

        {/* 🔧 진행 바 애니메이션 */}
        <div className="mt-8 w-64 mx-auto">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 rounded-full animate-pulse transform translate-x-0 transition-transform duration-1000 ease-in-out"></div>
          </div>
        </div>

        {/* 🔧 접근성을 위한 스크린 리더 텍스트 */}
        <div className="sr-only" aria-live="polite">
          페이지를 불러오는 중입니다. 잠시만 기다려주세요.
        </div>

      </div>
    </div>
  );
}