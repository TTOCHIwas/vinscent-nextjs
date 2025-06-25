import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 브랜드 섹션 */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              Vinscent
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              향수와 뷰티의 모든 것을 공유하는 소셜 플랫폼입니다. 
              당신만의 향수 이야기를 들려주세요.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.624 5.367 11.99 11.988 11.99s11.987-5.366 11.987-11.99C24.004 5.367 18.641.001 12.017.001zm0 21.5c-5.246 0-9.513-4.267-9.513-9.513S6.771 2.474 12.017 2.474s9.513 4.267 9.513 9.513c0 5.246-4.267 9.513-9.513 9.513z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* 서비스 링크 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              서비스
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/posts" className="text-gray-600 hover:text-primary-600 transition-colors">
                  게시글
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-primary-600 transition-colors">
                  제품
                </Link>
              </li>
              <li>
                <Link href="/magazine" className="text-gray-600 hover:text-primary-600 transition-colors">
                  매거진
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-600 hover:text-primary-600 transition-colors">
                  검색
                </Link>
              </li>
            </ul>
          </div>

          {/* 고객지원 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              고객지원
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-primary-600 transition-colors">
                  도움말
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary-600 transition-colors">
                  문의하기
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary-600 transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary-600 transition-colors">
                  이용약관
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2024 Vinscent. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="/privacy" className="text-gray-600 hover:text-primary-600 text-sm transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-primary-600 text-sm transition-colors">
                이용약관
              </Link>
              <Link href="/sitemap" className="text-gray-600 hover:text-primary-600 text-sm transition-colors">
                사이트맵
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}