'use client';

import { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Package, 
  Star, 
  Filter, 
  Search,
  Grid3X3,
  List,
  Heart,
  Bookmark,
  Building,
  TrendingUp
} from 'lucide-react';

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: '전체', count: 156 },
    { id: 'perfume', name: '향수', count: 89 },
    { id: 'skincare', name: '스킨케어', count: 34 },
    { id: 'makeup', name: '메이크업', count: 23 },
    { id: 'bodycare', name: '바디케어', count: 10 }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        
        {/* 🔧 헤더 섹션 */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  제품 카탈로그
                </h1>
                <p className="text-gray-600">
                  브랜드가 직접 등록한 향수와 뷰티 제품들
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Link
                  href="/search"
                  className="flex items-center space-x-2 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  <Search className="w-5 h-5" />
                  <span>제품 검색</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* 🔧 사이드바 (카테고리 및 필터) */}
            <div className="lg:w-64 space-y-6">
              
              {/* 카테고리 */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">카테고리</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-purple-100 text-purple-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-sm">{category.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 브랜드 필터 */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">인기 브랜드</h3>
                <div className="space-y-3">
                  {[
                    '르 라보', '바이레도', '조 말론', '딥디크', '아이즈원',
                    '톰 포드', '구찌', '불가리', '에르메스', '샤넬'
                  ].slice(0, 6).map((brand) => (
                    <div key={brand} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Building className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="text-sm text-gray-700 hover:text-purple-600 cursor-pointer">
                        {brand}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 🔧 메인 컨텐츠 */}
            <div className="flex-1">
              
              {/* 정렬 및 보기 옵션 */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 mb-6">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    총 <span className="font-semibold">156개</span> 제품
                  </span>
                </div>

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

              {/* Phase 2에서 구현될 제품 그리드/리스트 */}
              <div className="text-center py-20">
                <div className="text-6xl mb-6">🚧</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  제품 카탈로그 개발 중
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Phase 2 (Day 27-29)에서 오늘의집 스타일의 
                  완전한 제품 시스템을 구현할 예정입니다.
                </p>
                
                {/* 미리보기 제품 카드들 */}
                <div className={`grid ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                    : 'grid-cols-1 max-w-3xl mx-auto gap-4'
                }`}>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}
                    >
                      <div className={`bg-gradient-to-br from-amber-100 to-orange-100 ${
                        viewMode === 'list' ? 'w-32 h-32' : 'aspect-square'
                      } flex items-center justify-center`}>
                        <Package className="w-12 h-12 text-amber-500" />
                      </div>
                      
                      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">
                            샘플 제품 {i}
                          </h3>
                          <div className="flex space-x-1">
                            <button className="text-gray-400 hover:text-red-500 transition-colors">
                              <Heart className="w-4 h-4" />
                            </button>
                            <button className="text-gray-400 hover:text-purple-500 transition-colors">
                              <Bookmark className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">브랜드명</p>
                        
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex items-center">
                            {[1,2,3,4,5].map((star) => (
                              <Star 
                                key={star} 
                                className="w-3 h-3 text-yellow-400 fill-current" 
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">(24)</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-purple-600">₩89,000</span>
                          {viewMode === 'list' && (
                            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                              상세보기
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}