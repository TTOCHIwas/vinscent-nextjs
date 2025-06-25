import Header from './Header';
import Footer from './Footer';
import Toast from '@/components/ui/Toast';

interface MainLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

export default function MainLayout({ 
  children, 
  showHeader = true, 
  showFooter = true,
  className = '' 
}: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && <Header />}
      
      <main className={`flex-grow ${className}`}>
        {children}
      </main>
      
      {showFooter && <Footer />}
      
      <Toast />
    </div>
  );
}