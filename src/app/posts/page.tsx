'use client';

import { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Sparkles, 
  Filter, 
  TrendingUp, 
  Clock, 
  Heart, 
  Plus,
  Grid3X3,
  List,
  Search
} from 'lucide-react';

export default function PostsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending'>('latest');

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        
        {/* 🔧 헤더 섹션 */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              
              {/* 제목 및 설명 */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  게시글 둘러보기
                </h1>
                <p className="text-gray-600">
                  향수와 뷰티의 다양한 이야기를 만나보세요
                </p>
              </div>

              {/* 액션 버튼들 */}
              <div className="flex items-center space-x-3">
                <Link
                  href="/posts/create"
                  className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>새 게시글</span>
                </Link>
                
                <Link
                  href="/search"
                  className="flex items-center space-x-2 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  <Search className="w-5 h-5" />
                  <span>검색</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 🔧 필터 및 정렬 바 */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
              
              {/* 정렬 옵션 */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setSortBy('latest')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      sortBy === 'latest' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>최신순</span>
                  </button>
                  
                  <button
                    onClick={() => setSortBy('popular')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      sortBy === 'popular' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                    <span>인기순</span>
                  </button>
                  
                  <button
                    onClick={() => setSortBy('trending')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      sortBy === 'trending' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>트렌딩</span>
                  </button>
                </div>
              </div>

              {/* 보기 모드 및 필터 */}
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>필터</span>
                </button>
                
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔧 인기 해시태그 */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-gray-900">인기 해시태그</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                '#무드', '#패션', '#이야기', '#향수추천', '#데일리룩',
                '#뷰티팁', '#스킨케어', '#메이크업', '#향기', '#분위기'
              ].map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 🔧 메인 컨텐츠 영역 */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          
          {/* Phase 2에서 구현될 게시글 피드 컨테이너 */}
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🚧</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              게시글 피드 개발 중
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Phase 2 (Day 15-17)에서 Instagram 스타일의 
              완전한 게시글 피드를 구현할 예정입니다.
            </p>
            
            {/* 미리보기 카드들 */}
            <div className={`grid ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'grid-cols-1 max-w-2xl mx-auto gap-4'
            }`}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`bg-gradient-to-br from-purple-100 to-pink-100 ${
                    viewMode === 'list' ? 'w-24 h-24' : 'aspect-square'
                  } flex items-center justify-center`}>
                    <Sparkles className="w-8 h-8 text-purple-400" />
                  </div>
                  {viewMode === 'list' && (
                    <div className="flex-1 p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        샘플 게시글 {i}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        향수와 뷰티에 관한 멋진 이야기...
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>좋아요 24</span>
                        <span>댓글 8</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-semibold"
              >
                <span>홈으로 돌아가기</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}