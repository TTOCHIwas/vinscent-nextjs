'use client';

import Link from 'next/link';
import { Sparkles, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      
      {/* 🔧 메인 푸터 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* 브랜드 정보 */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">Vinscent</span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              향수와 뷰티의 모든 이야기를 담은 소셜 플랫폼. 
              당신의 향기로운 일상을 기록하고 공유하세요.
            </p>
            
            {/* 소셜 미디어 링크 */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 서비스 링크 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">서비스</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/posts" className="text-gray-600 hover:text-purple-600 transition-colors">
                  게시글 둘러보기
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-purple-600 transition-colors">
                  제품 카탈로그
                </Link>
              </li>
              <li>
                <Link href="/magazine" className="text-gray-600 hover:text-purple-600 transition-colors">
                  브랜드 매거진
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-600 hover:text-purple-600 transition-colors">
                  해시태그 검색
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-gray-600 hover:text-purple-600 transition-colors">
                  트렌딩
                </Link>
              </li>
            </ul>
          </div>

          {/* 계정 및 지원 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">계정 & 지원</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/auth/signup" className="text-gray-600 hover:text-purple-600 transition-colors">
                  회원가입
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-gray-600 hover:text-purple-600 transition-colors">
                  로그인
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-600 hover:text-purple-600 transition-colors">
                  도움말 센터
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-600 hover:text-purple-600 transition-colors">
                  고객 지원
                </Link>
              </li>
              <li>
                <Link href="/brand" className="text-gray-600 hover:text-purple-600 transition-colors">
                  브랜드 입점 문의
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 정보 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">연락처</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>contact@vinscent.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>02-1234-5678</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-600">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  서울특별시 강남구<br />
                  테헤란로 123, 456빌딩 7층
                </span>
              </li>
            </ul>
            
            {/* 영업시간 */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-2">고객센터 운영시간</h4>
              <p className="text-sm text-gray-600">
                평일: 09:00 - 18:00<br />
                주말, 공휴일: 휴무
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 🔧 하단 저작권 및 법적 정보 */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* 법적 링크 */}
          <div className="flex flex-wrap justify-center md:justify-start space-x-6 mb-4">
            <Link href="/terms" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
              이용약관
            </Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
              개인정보처리방침
            </Link>
            <Link href="/youth" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
              청소년보호정책
            </Link>
            <Link href="/business" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
              사업자정보확인
            </Link>
            <Link href="/rules" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
              커뮤니티 가이드라인
            </Link>
          </div>

          {/* 저작권 및 회사 정보 */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-sm text-gray-600">
              <p>© {currentYear} Vinscent. All rights reserved.</p>
              <p className="mt-1">
                사업자등록번호: 123-45-67890 | 대표: 조준희, 김동현
              </p>
            </div>
            
            {/* 인증 마크 영역 */}
            <div className="flex items-center space-x-4">
              <div className="text-xs text-gray-500 text-center">
                <div className="w-16 h-8 bg-gray-200 rounded flex items-center justify-center mb-1">
                  <span className="text-xs">SSL</span>
                </div>
                <span>보안인증</span>
              </div>
              <div className="text-xs text-gray-500 text-center">
                <div className="w-16 h-8 bg-gray-200 rounded flex items-center justify-center mb-1">
                  <span className="text-xs">ISMS</span>
                </div>
                <span>정보보호</span>
              </div>
            </div>
          </div>

          {/* 면책조항 */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 leading-relaxed">
              Vinscent는 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 
              상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다. 
              Vinscent가 제공하는 서비스는 개인의 의견과 표현의 공간으로, 
              Vinscent의 입장과 다를 수 있습니다.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}