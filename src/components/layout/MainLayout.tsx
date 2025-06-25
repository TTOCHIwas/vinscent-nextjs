import dynamic from 'next/dynamic';
import Header from './Header';
import Footer from './Footer';

// 🔧 Toast를 클라이언트에서만 로드 (SSR 제외)
const Toast = dynamic(() => import('@/components/ui/Toast'), {
  ssr: false,
  loading: () => (
    <div className="fixed top-4 right-4 z-[9999]">
      <div className="bg-gray-200 text-gray-600 p-3 rounded text-xs">
        Toast Loading...
      </div>
    </div>
  )
});

interface MainLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showToast?: boolean;
  className?: string;
}

export default function MainLayout({ 
  children, 
  showHeader = true, 
  showFooter = true,
  showToast = true,
  className = '' 
}: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Header */}
      {showHeader && (
        <header className="relative z-40">
          <Header />
        </header>
      )}
      
      {/* Main Content */}
      <main className={`flex-grow relative z-10 ${className}`}>
        {children}
      </main>
      
      {/* Footer */}
      {showFooter && (
        <footer className="relative z-20">
          <Footer />
        </footer>
      )}
      
      {/* 🔧 Toast - 클라이언트에서만 로드 */}
      {showToast && <Toast />}
    </div>
  );
}