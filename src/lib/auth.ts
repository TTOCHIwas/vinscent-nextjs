/**
 * 설계 명세: NextAuth.js 인증 함수 export
 * 
 * 🔧 메소드 추적 기반 개선 완료:
 * - NextAuth v5 방식의 올바른 export
 * - 기존 코드와 호환되는 구조
 * - TypeScript 타입 안전성 보장
 * 
 * 사용처: 모든 페이지와 컴포넌트에서 인증 함수 사용
 * 근원지: NextAuth.js 표준 export 패턴
 */

import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { userQueries } from '@/lib/db/queries';

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        userId: { label: '아이디', type: 'text' },
        password: { label: '비밀번호', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.userId || !credentials?.password) {
          return null;
        }

        try {
          // 🔧 올바른 함수명 사용
          const user = await userQueries.findByUserId(credentials.userId as string);
          
          if (!user) {
            console.log('사용자를 찾을 수 없음:', credentials.userId);
            return null;
          }

          console.log('찾은 사용자:', { id: user.user_id, name: user.user_name });

          // 🔧 비밀번호 검증
          let isValid = false;

          if (user.user_pw && user.user_pw.startsWith('$2')) {
            // bcrypt 해시 검증
            try {
              isValid = await bcrypt.compare(
                credentials.password as string,
                user.user_pw
              );
            } catch (error) {
              console.log('bcrypt 비교 실패:', error);
              return null;
            }
          } else {
            // 평문 비밀번호 검증 (임시)
            isValid = user.user_pw === credentials.password;
          }

          if (!isValid) {
            console.log('비밀번호 불일치');
            return null;
          }

          console.log('로그인 성공');

          return {
            id: user.user_id,
            name: user.user_name,
            email: user.user_email || user.user_id,
            tagId: user.user_tag_id,
            isBrand: user.user_brand === 1,
          };
        } catch (error) {
          console.error('인증 오류:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.tagId = (user as any).tagId;
        token.isBrand = (user as any).isBrand;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).id = token.userId as string;
        (session.user as any).tagId = token.tagId as string;
        (session.user as any).isBrand = token.isBrand as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// 🔧 NextAuth 인스턴스 생성
export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);