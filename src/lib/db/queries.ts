import { eq, desc, and } from 'drizzle-orm';
import { db } from './index';
import { users, posts, comments, follows, likePosts, bookmarkPosts } from './schema';

// 사용자 쿼리
export const userQueries = {
  // 사용자 ID로 조회
  findById: async (userId: string) => {
    const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    return result[0] || null;
  },

  // 이메일로 사용자 조회 (로그인용)
  findByEmail: async (email: string) => {
    const result = await db.select().from(users).where(eq(users.id, email)).limit(1);
    return result[0] || null;
  },

  // 모든 사용자 조회
  findAll: async () => {
    return await db.select().from(users);
  },
};

// 게시글 쿼리
export const postQueries = {
  // 모든 게시글 조회 (최신순)
  findAll: async (limit = 20) => {
    return await db
      .select()
      .from(posts)
      .orderBy(desc(posts.createdDate))
      .limit(limit);
  },

  // 게시글 ID로 조회
  findById: async (postId: number) => {
    const result = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);
    return result[0] || null;
  },

  // 사용자별 게시글 조회
  findByUserId: async (userId: string, limit = 20) => {
    return await db
      .select()
      .from(posts)
      .where(eq(posts.userId, userId))
      .orderBy(desc(posts.createdDate))
      .limit(limit);
  },

  // 매거진 게시글만 조회
  findMagazines: async (limit = 20) => {
    return await db
      .select()
      .from(posts)
      .where(eq(posts.magazine, 1))
      .orderBy(desc(posts.createdDate))
      .limit(limit);
  },
};

// 댓글 쿼리
export const commentQueries = {
  // 게시글의 댓글 조회
  findByPostId: async (postId: number) => {
    return await db
      .select()
      .from(comments)
      .where(eq(comments.postId, postId))
      .orderBy(desc(comments.createdAt));
  },
};

// 팔로우 쿼리
export const followQueries = {
  // 팔로잉 목록 조회
  findFollowing: async (userId: string) => {
    return await db
      .select()
      .from(follows)
      .where(eq(follows.userId, userId));
  },

  // 팔로워 목록 조회
  findFollowers: async (userId: string) => {
    return await db
      .select()
      .from(follows)
      .where(eq(follows.targetId, userId));
  },
};