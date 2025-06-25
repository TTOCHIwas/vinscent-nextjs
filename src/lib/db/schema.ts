import { mysqlTable, varchar, text, int, tinyint, timestamp } from 'drizzle-orm/mysql-core';

// User 테이블 (기존 스키마에 맞게 수정)
export const users = mysqlTable('user', {
  id: varchar('user_id', { length: 255 }).primaryKey(),
  tagId: varchar('user_tagid', { length: 255 }),
  password: varchar('user_password', { length: 255 }).notNull(),
  name: varchar('user_name', { length: 255 }).notNull(),
  gender: varchar('user_gender', { length: 10 }),
  phoneNum: varchar('user_phone_num', { length: 20 }),
  birthday: varchar('user_birthday', { length: 20 }),
  brand: tinyint('user_brand').default(0), // 0: 개인, 1: 브랜드
});

// Post 테이블 (기존 스키마에 맞게 수정)
export const posts = mysqlTable('post', {
  id: int('post_id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  title: varchar('post_title', { length: 255 }),
  content: text('post_content'),
  status: tinyint('post_status').default(1),
  privacy: tinyint('post_privacy').default(0),
  magazine: tinyint('magazine').default(0), // 0: 일반, 1: 매거진
  categoryId: int('category_id'),
  createdDate: timestamp('post_created_date').defaultNow(),
  updatedDate: timestamp('post_updated_date').defaultNow(),
});

// Comment 테이블 (기존 스키마에 맞게 수정)
export const comments = mysqlTable('comment', {
  id: int('comment_id').primaryKey().autoincrement(),
  postId: int('post_id').notNull(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  content: text('content').notNull(),
  parentCommentId: int('parent_comment_id'),
});

// Follow 테이블 (기존 스키마에 맞게 수정)
export const follows = mysqlTable('follow', {
  id: int('follow_id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  targetId: varchar('target_id', { length: 255 }).notNull(),
});

// Like Post 테이블 (기존 스키마에 맞게 수정)
export const likePosts = mysqlTable('like_post', {
  id: int('like_id').primaryKey().autoincrement(),
  postId: int('post_id').notNull(),
  userId: varchar('user_id', { length: 255 }).notNull(),
});

// Bookmark Post 테이블 (기존 스키마에 맞게 수정)
export const bookmarkPosts = mysqlTable('bookmark_post', {
  id: int('bookmark_id').primaryKey().autoincrement(),
  postId: int('post_id').notNull(),
  userId: varchar('user_id', { length: 255 }).notNull(),
});

// Product 테이블 (기존 스키마에 맞게 수정)
export const products = mysqlTable('product', {
  id: int('product_id').primaryKey().autoincrement(),
  brandId: varchar('brand_id', { length: 255 }),
  name: varchar('product_name', { length: 255 }).notNull(),
  description: text('product_description'),
  price: int('product_price'),
  categoryId: int('category_id'),
});

// Post Image 테이블
export const postImages = mysqlTable('post_image', {
  id: int('image_id').primaryKey().autoincrement(),
  postId: int('post_id').notNull(),
  imageUrl: varchar('image_url', { length: 500 }).notNull(),
  imageIndex: int('image_index').default(0),
});

// Tag Product 테이블 (게시글-제품 연결)
export const tagProducts = mysqlTable('tag_product', {
  id: int('tag_id').primaryKey().autoincrement(),
  postId: int('post_id').notNull(),
  productId: int('product_id').notNull(),
});

// Category 테이블
export const categories = mysqlTable('category', {
  id: int('category_id').primaryKey().autoincrement(),
  title: varchar('category_title', { length: 255 }).notNull(),
});

// User Term 테이블 (약관 동의)
export const userTerms = mysqlTable('user_term', {
  id: int('user_term_id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  termId: int('term_id').notNull(),
});