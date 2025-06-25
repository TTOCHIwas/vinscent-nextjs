import Header from './Header';
import Footer from './Footer';
import Toast from '@/components/ui/Toast'; // 🔧 직접 import

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
  // 🔧 MainLayout 렌더링 확인
  console.log('🔧 MainLayout 렌더링됨 - showToast:', showToast);

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
      
      {/* 🔧 Toast - 항상 렌더링 (조건부 제거) */}
      <Toast />
    </div>
  );
}