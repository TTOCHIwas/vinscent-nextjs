import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vinscent - 향수 소셜 플랫폼',
  description: '향수와 뷰티의 모든 것을 공유하는 소셜 플랫폼',
  keywords: ['향수', '뷰티', '소셜', '플랫폼', '브랜드', '리뷰'],
  authors: [{ name: 'Vinscent Team' }],
  creator: 'Vinscent',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://vinscent.com',
    title: 'Vinscent - 향수 소셜 플랫폼',
    description: '향수와 뷰티의 모든 것을 공유하는 소셜 플랫폼',
    siteName: 'Vinscent',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vinscent - 향수 소셜 플랫폼',
    description: '향수와 뷰티의 모든 것을 공유하는 소셜 플랫폼',
    creator: '@vinscent',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <div id="root" className="min-h-full">
          {children}
        </div>
      </body>
    </html>
  );
}