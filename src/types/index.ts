// 사용자 관련 타입
export interface User {
  id: string;
  tagId: string;
  name: string;
  email?: string;
  profileImage?: string;
  bio?: string;
  isVerified: boolean;
  isBrand: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 게시글 관련 타입
export interface Post {
  id: string;
  userId: string;
  user?: User;
  content: string;
  images: PostImage[];
  hashtags: string[];
  mentions: string[];
  productTags: string[];
  isMagazine: boolean;
  isPrivate: boolean;
  likeCount: number;
  commentCount: number;
  bookmarkCount: number;
  shareCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// 게시글 이미지 타입
export interface PostImage {
  id: string;
  postId: string;
  url: string;
  index: number;
  alt?: string;
}

// 댓글 관련 타입
export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user?: User;
  content: string;
  parentId?: string;
  replies?: Comment[];
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// 제품 관련 타입
export interface Product {
  id: string;
  brandId: string;
  brand?: User;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  images: string[];
  tags: string[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 팔로우 관련 타입
export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;
}

// API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 페이지네이션 타입
export interface PaginationMeta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}