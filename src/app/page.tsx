'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { Sparkles, Search, Users, Heart } from 'lucide-react';

export default function HomePage() {
  const { data: session, status } = useSession();

  // 🔧 로딩 상태 처리
  if (status === 'loading') {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-lg text-gray-600">로딩 중...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* 🔧 히어로 섹션: Instagram 스타일 + 향수/뷰티 특화 */}
      <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-16 h-16 text-purple-600" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-purple-600">Vinscent</span>에서 만나는
            <br className="md:hidden" />
            <span className="text-pink-600"> 향기로운 순간</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            향수와 뷰티의 모든 이야기를 담은 소셜 플랫폼
            <br />
            <span className="text-purple-600 font-semibold">#무드 #패션 #이야기</span>로 시작하세요
          </p>

          {/* 🔧 로그인 상태에 따른 액션 버튼 */}
          {session ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/posts" 
                className="bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                <Heart className="w-5 h-5 mr-2" />
                피드 둘러보기
              </Link>
              <Link 
                href="/search" 
                className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center"
              >
                <Search className="w-5 h-5 mr-2" />
                해시태그 검색
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/auth/signup" 
                className="bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
              >
                지금 시작하기
              </Link>
              <Link 
                href="/auth/login" 
                className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
              >
                로그인
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 🔧 특징 소개 섹션: 차별화 포인트 강조 */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Vinscent만의 특별한 경험
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* 해시태그 기반 분류 */}
            <div className="text-center p-8 rounded-2xl bg-purple-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                자유로운 해시태그
              </h3>
              <p className="text-gray-600 leading-relaxed">
                복잡한 카테고리 대신 <span className="text-purple-600 font-semibold">#무드 #패션 #이야기</span> 같은 자유로운 해시태그로 콘텐츠를 분류하세요
              </p>
            </div>

            {/* 향수/뷰티 전문 */}
            <div className="text-center p-8 rounded-2xl bg-pink-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                향수 & 뷰티 특화
              </h3>
              <p className="text-gray-600 leading-relaxed">
                향수 리뷰부터 뷰티 팁까지, 향기와 아름다움에 대한 모든 이야기를 전문적으로 다룹니다
              </p>
            </div>

            {/* 브랜드 친화적 */}
            <div className="text-center p-8 rounded-2xl bg-amber-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                브랜드와 함께
              </h3>
              <p className="text-gray-600 leading-relaxed">
                개인 사용자와 브랜드가 동일한 UX로 자연스럽게 소통할 수 있는 환경을 제공합니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔧 인기 해시태그 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            지금 인기 있는 해시태그
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              '#무드', '#패션', '#이야기', '#향수추천', '#데일리룩',
              '#뷰티팁', '#스킨케어', '#메이크업', '#향기', '#분위기',
              '#오늘의향수', '#퍼퓸', '#코스메틱', '#라이프스타일'
            ].map((tag) => (
              <span
                key={tag}
                className="bg-white px-6 py-3 rounded-full text-purple-600 font-semibold border-2 border-purple-200 hover:border-purple-400 hover:shadow-md transition-all cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {session ? (
            <Link 
              href="/search" 
              className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors"
            >
              <Search className="w-5 h-5 mr-2" />
              더 많은 해시태그 검색하기
            </Link>
          ) : (
            <p className="text-gray-600">
              <Link href="/auth/signup" className="text-purple-600 font-semibold hover:text-purple-700">
                가입하고
              </Link>
              {' '}더 많은 해시태그를 탐색해보세요
            </p>
          )}
        </div>
      </section>

      {/* 🔧 서비스 소개 섹션 */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Instagram의 단순함 + 오늘의집의 전문성
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            복잡하지 않으면서도 향수와 뷰티에 특화된 경험을 제공합니다. 
            당신의 향기로운 일상을 기록하고 공유해보세요.
          </p>
          
          {!session && (
            <Link 
              href="/auth/signup" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
            >
              지금 Vinscent 시작하기
            </Link>
          )}
        </div>
      </section>
    </MainLayout>
  );
}