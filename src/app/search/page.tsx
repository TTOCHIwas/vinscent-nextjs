
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Search, 
  Hash, 
  User, 
  Package, 
  FileText, 
  Clock, 
  TrendingUp,
  Filter,
  X,
  Sparkles
} from 'lucide-react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'posts' | 'users' | 'products' | 'hashtags'>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // 🔧 URL 쿼리 파라미터 처리
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(decodeURIComponent(q));
    }
  }, [searchParams]);

  // 🔧 인기 해시태그 (실제로는 API에서 가져올 예정)
  const trendingHashtags = [
    '#무드', '#패션', '#이야기', '#향수추천', '#데일리룩',
    '#뷰티팁', '#스킨케어', '#메이크업', '#향기', '#분위기',
    '#오늘의향수', '#퍼퓸', '#코스메틱', '#라이프스타일'
  ];

  // 🔧 최근 검색어 관리
  const addToRecentSearches = (searchTerm: string) => {
    const updated = [searchTerm, ...recentSearches.filter(term => term !== searchTerm)].slice(0, 10);
    setRecentSearches(updated);
    // localStorage에 저장하는 것은 artifacts에서 제한되므로 생략
  };

  const removeFromRecentSearches = (searchTerm: string) => {
    setRecentSearches(recentSearches.filter(term => term !== searchTerm));
  };

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      addToRecentSearches(searchTerm.trim());
      setQuery(searchTerm.trim());
      // 실제 검색 로직은 Phase 2에서 구현
    }
  };

  const searchTabs = [
    { id: 'all', name: '전체', icon: Search, count: 0 },
    { id: 'posts', name: '게시글', icon: FileText, count: 0 },
    { id: 'users', name: '사용자', icon: User, count: 0 },
    { id: 'products', name: '제품', icon: Package, count: 0 },
    { id: 'hashtags', name: '해시태그', icon: Hash, count: 0 }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        
        {/* 🔧 검색 헤더 */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-6">
            
            {/* 메인 검색창 */}
            <div className="relative mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(query);
                    }
                  }}
                  placeholder="게시글, 사용자, 제품, 해시태그를 검색하세요..."
                  className="w-full pl-12 pr-16 py-4 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              {/* 검색 버튼 */}
              <button
                onClick={() => handleSearch(query)}
                className="mt-3 w-full sm:w-auto bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
              >
                검색하기
              </button>
            </div>

            {/* 검색 탭 */}
            <div className="flex overflow-x-auto space-x-1">
              {searchTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                    {tab.count > 0 && (
                      <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          
          {/* 🔧 검색 결과가 없을 때 기본 화면 */}
          {!query && (
            <div className="space-y-8">
              
              {/* 인기 해시태그 */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-bold text-gray-900">인기 해시태그</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {trendingHashtags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleSearch(tag)}
                      className="flex items-center space-x-2 bg-white px-4 py-3 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors group"
                    >
                      <Hash className="w-4 h-4 text-purple-600" />
                      <span className="text-gray-700 group-hover:text-purple-700">{tag}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 최근 검색어 */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <h2 className="text-xl font-bold text-gray-900">최근 검색어</h2>
                    </div>
                    <button
                      onClick={() => setRecentSearches([])}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      전체 삭제
                    </button>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((term, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200"
                      >
                        <button
                          onClick={() => handleSearch(term)}
                          className="flex-1 text-left text-gray-700 hover:text-purple-600"
                        >
                          {term}
                        </button>
                        <button
                          onClick={() => removeFromRecentSearches(term)}
                          className="text-gray-400 hover:text-gray-600 ml-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 검색 팁 */}
              <div className="bg-purple-50 rounded-2xl p-6">
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2">검색 팁</h3>
                    <ul className="text-purple-700 space-y-1 text-sm">
                      <li>• 해시태그로 관련 게시글을 빠르게 찾아보세요</li>
                      <li>• 브랜드명으로 공식 제품과 매거진을 검색하세요</li>
                      <li>• @사용자명으로 특정 사용자를 찾을 수 있습니다</li>
                      <li>• 여러 키워드를 조합해서 더 정확한 결과를 얻으세요</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 🔧 검색 결과 영역 (Phase 2에서 구현 예정) */}
          {query && (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🚧</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                고급 검색 시스템 개발 중
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Phase 2 (Day 21-23)에서 해시태그 클러스터링 기반의 
                완전한 검색 시스템을 구현할 예정입니다.
              </p>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200 max-w-md mx-auto">
                <div className="text-left">
                  <div className="font-semibold text-gray-900 mb-2">
                    검색어: "{query}"
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>• 게시글 검색 결과: 구현 예정</div>
                    <div>• 사용자 검색 결과: 구현 예정</div>
                    <div>• 제품 검색 결과: 구현 예정</div>
                    <div>• 해시태그 클러스터링: 구현 예정</div>
                  </div>
                </div>
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
          )}
        </div>
      </div>
    </MainLayout>
  );
}