import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vinscent - 향수 소셜 플랫폼',
  description: '향수와 뷰티의 모든 것을 공유하는 소셜 플랫폼',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <Providers>
          <div id="root" className="min-h-full">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}