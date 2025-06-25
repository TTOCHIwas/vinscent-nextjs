/**
 * 설계 명세: NextAuth.js v5 인증 설정
 * 
 * 🔧 메소드 추적 기반 개선 완료:
 * - bcrypt 패키지 사용 (bcryptjs 대신)
 * - 올바른 TypeScript 타입 정의
 * - 기존 MySQL 사용자 테이블과 호환
 * - JWT 전략 사용으로 서버리스 환경 최적화
 * 
 * 사용처: 모든 인증 관련 페이지 및 API
 * 근원지: 기존 Passport.js 인증을 NextAuth로 마이그레이션
 */

import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { userQueries } from '@/lib/db/queries';

export const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        userId: { 
          label: '아이디', 
          type: 'text',
          placeholder: '아이디를 입력하세요'
        },
        password: { 
          label: '비밀번호', 
          type: 'password',
          placeholder: '비밀번호를 입력하세요'
        }
      },
      async authorize(credentials) {
        // 🔧 입력값 검증
        if (!credentials?.userId || !credentials?.password) {
          console.log('🚨 인증 실패: 아이디 또는 비밀번호 누락');
          return null;
        }

        try {
          // 🔧 기존 데이터베이스에서 사용자 조회 (user_id로 검색)
          const user = await userQueries.findByUserId(credentials.userId as string);
          
          if (!user) {
            console.log('🚨 사용자를 찾을 수 없음:', credentials.userId);
            return null;
          }

          // 🔧 사용자 상태 확인
          if (user.user_status !== 1) {
            console.log('🚨 비활성화된 사용자:', credentials.userId);
            return null;
          }

          console.log('✅ 사용자 발견:', { 
            id: user.user_id, 
            name: user.user_name,
            isBrand: user.user_brand === 1
          });

          // 🔧 비밀번호 검증 (기존 bcrypt 해시와 호환)
          let isPasswordValid = false;

          try {
            // bcrypt 해시 검증 시도
            if (user.user_pw && user.user_pw.startsWith('$2')) {
              isPasswordValid = await bcrypt.compare(
                credentials.password as string,
                user.user_pw
              );
              console.log('🔐 bcrypt 비밀번호 검증:', isPasswordValid ? '성공' : '실패');
            } else {
              // 임시: 평문 비밀번호 처리 (기존 데이터가 평문인 경우)
              isPasswordValid = user.user_pw === credentials.password;
              console.log('⚠️ 평문 비밀번호 검증:', isPasswordValid ? '성공' : '실패');
              
              if (isPasswordValid) {
                console.log('⚠️ 경고: 평문 비밀번호가 감지되었습니다. 보안을 위해 해시화를 권장합니다.');
              }
            }
          } catch (bcryptError) {
            console.error('🚨 비밀번호 검증 오류:', bcryptError);
            return null;
          }

          if (!isPasswordValid) {
            console.log('🚨 비밀번호 불일치');
            return null;
          }

          console.log('🎉 로그인 성공:', user.user_name);

          // 🔧 NextAuth 세션용 사용자 객체 반환
          return {
            id: user.user_id,
            name: user.user_name,
            email: user.user_email || user.user_id, // 이메일이 없으면 user_id 사용
            image: user.user_profile_image || null,
            // 🔧 커스텀 필드들
            tagId: user.user_tag_id,
            isBrand: user.user_brand === 1,
            isVerified: user.user_verified === 1,
            createdAt: user.user_created_date
          };

        } catch (error) {
          console.error('🚨 인증 과정 중 오류:', error);
          return null;
        }
      },
    }),
  ],
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  
  callbacks: {
    async jwt({ token, user, account }) {
      // 🔧 초기 로그인 시 사용자 정보를 토큰에 저장
      if (user) {
        token.userId = user.id;
        token.tagId = (user as any).tagId;
        token.isBrand = (user as any).isBrand;
        token.isVerified = (user as any).isVerified;
        token.createdAt = (user as any).createdAt;
      }
      
      return token;
    },
    
    async session({ session, token }) {
      // 🔧 토큰의 정보를 세션에 포함
      if (token && session.user) {
        session.user.id = token.userId as string;
        (session.user as any).tagId = token.tagId as string;
        (session.user as any).isBrand = token.isBrand as boolean;
        (session.user as any).isVerified = token.isVerified as boolean;
        (session.user as any).createdAt = token.createdAt as Date;
      }
      
      return session;
    },
    
    async redirect({ url, baseUrl }) {
      // 🔧 로그인 후 리다이렉트 처리
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    }
  },
  
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  
  // 🔧 보안 설정
  secret: process.env.NEXTAUTH_SECRET,
  
  // 🔧 디버그 모드 (개발 환경에서만)
  debug: process.env.NODE_ENV === 'development',
  
  // 🔧 이벤트 핸들러
  events: {
    async signIn(message) {
      console.log('✅ 로그인 이벤트:', message.user.name);
    },
    async signOut(message) {
      console.log('👋 로그아웃 이벤트:', message.token);
    },
  },
};