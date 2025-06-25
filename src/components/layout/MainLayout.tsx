
'use client';

import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function MainLayout({ children, className = '' }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 🔧 헤더: 상단 고정 */}
      <Header />
      
      {/* 🔧 메인 콘텐츠: 자동 확장 */}
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      
      {/* 🔧 푸터: 하단 고정 */}
      <Footer />
    </div>
  );
}