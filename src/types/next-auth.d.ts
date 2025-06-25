import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      tagId: string;
      isBrand: boolean;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    tagId: string;
    isBrand: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    userId: string;
    tagId: string;
    isBrand: boolean;
  }
}