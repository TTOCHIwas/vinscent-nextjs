/**
 * 설계 명세: NextAuth.js API 라우트 (수정된 버전)
 * 
 * 🔧 메소드 추적 기반 개선 완료:
 * - bcrypt 패키지 사용 (bcryptjs 제거)
 * - 올바른 TypeScript 타입 정의
 * - NextAuth v5 호환 설정
 * - 기존 user_id 필드와 호환
 * 
 * 사용처: /api/auth/* 모든 인증 엔드포인트
 * 근원지: NextAuth.js 표준 API 라우트
 */

import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt'; // bcryptjs 대신 bcrypt 사용
import { userQueries } from '@/lib/db/queries';

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        userId: { label: '아이디', type: 'text' },
        password: { label: '비밀번호', type: 'password' }
      },
      // 🔧 TypeScript 타입 명시적 정의
      async authorize(credentials): Promise<any> {
        if (!credentials?.userId || !credentials?.password) {
          return null;
        }

        try {
          // 🔧 기존 코드와 일치하도록 findByUserId 사용
          const user = await userQueries.findByUserId(credentials.userId as string);
          
          if (!user) {
            console.log('사용자를 찾을 수 없음:', credentials.userId);
            return null;
          }

          console.log('찾은 사용자:', { id: user.user_id, name: user.user_name });
          console.log('입력된 비밀번호:', credentials.password);

          // 🔧 비밀번호 검증 로직 개선
          let isValid = false;

          // bcrypt 해시 검증
          if (user.user_pw && user.user_pw.startsWith('$2')) {
            try {
              isValid = await bcrypt.compare(
                credentials.password as string,
                user.user_pw
              );
              console.log('bcrypt 비밀번호 검증:', isValid ? '성공' : '실패');
            } catch (error) {
              console.log('bcrypt 비교 실패:', error);
              return null;
            }
          } else {
            // 임시로 평문 비교 (기존 데이터가 평문인 경우)
            isValid = user.user_pw === credentials.password;
            console.log('평문 비밀번호 검증:', isValid ? '성공' : '실패');
          }

          if (!isValid) {
            console.log('비밀번호 불일치');
            return null;
          }

          console.log('로그인 성공');

          // 🔧 NextAuth 세션용 사용자 객체 반환
          return {
            id: user.user_id,
            name: user.user_name,
            email: user.user_email || user.user_id, // 기존 시스템에서는 user_id가 이메일 역할
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
    signUp: '/auth/signup',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// 🔧 NextAuth 인스턴스 생성 및 핸들러 export
const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };