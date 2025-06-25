/**
 * 설계 명세: NextAuth.js 타입 확장
 * 
 * 🔧 메소드 추적 기반 개선 완료:
 * - 기존 사용자 필드와 호환되는 타입 정의
 * - JWT 토큰 타입 확장
 * - 세션 타입 확장
 * - Vinscent 프로젝트 전용 사용자 필드 추가
 * 
 * 사용처: NextAuth 관련 모든 타입 검사
 * 근원지: NextAuth.js 기본 타입을 프로젝트에 맞게 확장
 */

import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * 🔧 User 타입 확장 - 로그인 시 반환되는 사용자 객체
   */
  interface User extends DefaultUser {
    id: string;
    tagId: string;
    isBrand: boolean;
    isVerified?: boolean;
    createdAt?: Date;
  }

  /**
   * 🔧 Session 타입 확장 - 클라이언트에서 사용하는 세션 객체
   */
  interface Session extends DefaultSession {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      tagId: string;
      isBrand: boolean;
      isVerified?: boolean;
      createdAt?: Date;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /**
   * 🔧 JWT 타입 확장 - 서버에서 사용하는 토큰 객체
   */
  interface JWT extends DefaultJWT {
    userId: string;
    tagId: string;
    isBrand: boolean;
    isVerified?: boolean;
    createdAt?: Date;
  }
}