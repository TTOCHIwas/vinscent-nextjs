import Link from 'next/link';
import { Home, Search, User, ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        
        {/* 🔧 브랜드 로고 */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center space-x-3">
            <Sparkles className="w-12 h-12 text-purple-600" />
            <span className="text-3xl font-bold text-purple-600">Vinscent</span>
          </Link>
        </div>

        {/* 🔧 404 메인 컨텐츠 */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          
          {/* 이모지와 404 */}
          <div className="mb-8">
            <div className="text-8xl md:text-9xl mb-4">🔍</div>
            <h1 className="text-6xl md:text-8xl font-bold text-purple-600 mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              페이지를 찾을 수 없습니다
            </h2>
          </div>

          {/* 설명 텍스트 */}
          <div className="mb-8">
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            </p>
            <p className="text-gray-500">
              URL을 다시 확인하시거나 아래 링크를 통해 원하는 페이지로 이동해보세요.
            </p>
          </div>

          {/* 🔧 네비게이션 버튼들 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            
            {/* 홈으로 가기 */}
            <Link
              href="/"
              className="flex items-center justify-center space-x-3 bg-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>홈으로 가기</span>
            </Link>

            {/* 검색하기 */}
            <Link
              href="/search"
              className="flex items-center justify-center space-x-3 bg-white text-purple-600 border-2 border-purple-600 px-6 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors group"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>검색하기</span>
            </Link>

          </div>

          {/* 🔧 인기 페이지 링크 */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500 mb-4">자주 찾는 페이지</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              
              <Link
                href="/posts"
                className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">게시글</span>
              </Link>

              <Link
                href="/products"
                className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                  <span className="text-2xl">💄</span>
                </div>
                <span className="text-sm font-medium text-gray-700">제품</span>
              </Link>

              <Link
                href="/magazine"
                className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                  <span className="text-2xl">📖</span>
                </div>
                <span className="text-sm font-medium text-gray-700">매거진</span>
              </Link>

              <Link
                href="/auth/login"
                className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">로그인</span>
              </Link>

            </div>
          </div>

          {/* 🔧 뒤로 가기 */}
          <div className="mt-8">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>이전 페이지로 돌아가기</span>
            </button>
          </div>

        </div>

        {/* 🔧 도움말 */}
        <div className="mt-8 text-center">
          <p className="text-gray-500">
            문제가 지속되면{' '}
            <Link 
              href="/support" 
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              고객 지원
            </Link>
            으로 문의해주세요.
          </p>
        </div>

      </div>
    </div>
  );
}