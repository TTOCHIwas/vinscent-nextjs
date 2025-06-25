'use client';

import { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { 
  BookOpen, 
  Crown, 
  Building, 
  Star, 
  Clock, 
  TrendingUp,
  Eye,
  Plus,
  Filter
} from 'lucide-react';

export default function MagazinePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: '전체', count: 45 },
    { id: 'brand-story', name: '브랜드 스토리', count: 18 },
    { id: 'product-guide', name: '제품 가이드', count: 12 },
    { id: 'trend', name: '트렌드', count: 9 },
    { id: 'interview', name: '인터뷰', count: 6 }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        
        {/* 🔧 헤더 섹션 */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <BookOpen className="w-16 h-16" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                브랜드 매거진
              </h1>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                브랜드가 직접 전하는 특별한 이야기와 뷰티 인사이트
              </p>
              
              {/* 특징 배지 */}
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Crown className="w-5 h-5" />
                  <span>브랜드 인증</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Building className="w-5 h-5" />
                  <span>공식 콘텐츠</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Star className="w-5 h-5" />
                  <span>프리미엄 품질</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔧 카테고리 네비게이션 */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 space-y-3 sm:space-y-0">
              
              {/* 카테고리 탭 */}
              <div className="flex items-center space-x-1 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-sm bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* 정렬 및 필터 */}
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>필터</span>
                </button>
                
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="latest">최신순</option>
                  <option value="popular">인기순</option>
                  <option value="trending">트렌딩</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          
          {/* 🔧 특집 매거진 (상단 배너) */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              이달의 특집
            </h2>
            
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl overflow-hidden text-white">
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 p-8 lg:p-12">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Building className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">르 라보</div>
                      <div className="text-purple-100 text-sm">프리미엄 브랜드</div>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4">
                    향기로 전하는 브랜드 스토리
                  </h3>
                  <p className="text-purple-100 mb-6 text-lg">
                    30년간 이어져온 아티잔 향수의 철학과 
                    새로운 컬렉션에 담긴 특별한 이야기
                  </p>
                  
                  <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                    전체 보기
                  </button>
                </div>
                
                <div className="lg:w-96 h-64 lg:h-auto bg-white/10 flex items-center justify-center">
                  <BookOpen className="w-24 h-24 text-white/50" />
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2에서 구현될 매거진 목록 */}
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🚧</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              브랜드 매거진 개발 중
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Phase 2 (Day 27-29)에서 브랜드 전용 
              매거진 시스템을 구현할 예정입니다.
            </p>
            
            {/* 미리보기 매거진 카드들 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-purple-400" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Building className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-gray-900">브랜드명</div>
                        <div className="text-xs text-gray-500">인증 브랜드</div>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-2">
                      매거진 제목 {i}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      브랜드가 직접 전하는 특별한 이야기와 제품에 대한 깊이 있는 인사이트...
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>1.2k</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>2일 전</span>
                        </div>
                      </div>
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        브랜드 스토리
                      </span>
                    </div>
                  </div>
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