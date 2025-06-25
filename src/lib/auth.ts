import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { userQueries } from '@/lib/db/queries';

export const { handlers, signIn, signOut, auth } = NextAuth({
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
          // 기존 데이터베이스에서 사용자 조회
          const user = await userQueries.findById(credentials.userId as string);
          
          if (!user) {
            console.log('사용자를 찾을 수 없음:', credentials.userId);
            return null;
          }

          console.log('찾은 사용자:', { id: user.id, name: user.name });
          console.log('입력된 비밀번호:', credentials.password);
          console.log('저장된 비밀번호:', user.password);

          // 임시로 평문 비교 (기존 데이터가 평문인 경우)
          const isValid = user.password === credentials.password;

          // bcrypt 해시인 경우를 위한 추가 체크
          let isBcryptValid = false;
          if (!isValid && user.password.startsWith('$2')) {
            try {
              isBcryptValid = await bcrypt.compare(
                credentials.password as string,
                user.password
              );
            } catch (error) {
              console.log('bcrypt 비교 실패:', error);
            }
          }

          if (!isValid && !isBcryptValid) {
            console.log('비밀번호 불일치');
            return null;
          }

          console.log('로그인 성공');

          // NextAuth 세션용 사용자 객체 반환
          return {
            id: user.id,
            name: user.name,
            email: user.id, // 기존 시스템에서는 user_id가 이메일 역할
            tagId: user.tagId,
            isBrand: user.brand === 1,
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
        token.tagId = user.tagId;
        token.isBrand = user.isBrand;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId as string;
        session.user.tagId = token.tagId as string;
        session.user.isBrand = token.isBrand as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    signUp: '/auth/signup',
  },
});