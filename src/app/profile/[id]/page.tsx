'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import { 
  User, 
  Building, 
  MapPin, 
  Calendar, 
  Link as LinkIcon, 
  Settings, 
  Grid3X3, 
  Heart,
  MessageCircle,
  Bookmark,
  UserPlus,
  UserCheck,
  Crown
} from 'lucide-react';

interface ProfileUser {
  id: string;
  tagId: string;
  name: string;
  bio?: string;
  profileImage?: string;
  isBrand: boolean;
  isVerified: boolean;
  location?: string;
  website?: string;
  joinedAt: string;
  
  // 통계
  postCount: number;
  followerCount: number;
  followingCount: number;
  
  // 현재 사용자와의 관계
  isFollowing?: boolean;
  isOwnProfile?: boolean;
}

interface Post {
  id: string;
  image: string;
  likeCount: number;
  commentCount: number;
  isVideo?: boolean;
}

export default function ProfilePage() {
  const params = useParams();
  const { data: session } = useSession();
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');
  const [followLoading, setFollowLoading] = useState(false);

  const userId = params.id as string;

  // 🔧 프로필 데이터 로드
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        
        // 사용자 정보 가져오기
        const userResponse = await fetch(`/api/users/${userId}`);
        if (!userResponse.ok) {
          throw new Error('사용자를 찾을 수 없습니다');
        }
        const userData = await userResponse.json();
        
        // 게시글 목록 가져오기
        const postsResponse = await fetch(`/api/users/${userId}/posts`);
        const postsData = await postsResponse.json();
        
        setUser(userData.data);
        setPosts(postsData.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : '프로필을 불러올 수 없습니다');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  // 🔧 팔로우/언팔로우 처리
  const handleFollowToggle = async () => {
    if (!session || !user) return;
    
    setFollowLoading(true);
    try {
      const response = await fetch(`/api/users/${userId}/follow`, {
        method: user.isFollowing ? 'DELETE' : 'POST',
      });
      
      if (response.ok) {
        setUser(prev => prev ? {
          ...prev,
          isFollowing: !prev.isFollowing,
          followerCount: prev.isFollowing 
            ? prev.followerCount - 1 
            : prev.followerCount + 1
        } : null);
      }
    } catch (error) {
      console.error('팔로우 처리 중 오류:', error);
    } finally {
      setFollowLoading(false);
    }
  };

  // 🔧 로딩 상태
  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-lg text-gray-600">프로필 로딩 중...</div>
        </div>
      </MainLayout>
    );
  }

  // 🔧 에러 상태
  if (error || !user) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <div className="text-6xl mb-4">😵</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">프로필을 찾을 수 없습니다</h1>
          <p className="text-gray-600 mb-6">{error || '존재하지 않는 사용자입니다'}</p>
          <Link 
            href="/" 
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* 🔧 프로필 헤더 */}
        <div className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              
              {/* 프로필 이미지 */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-200 overflow-hidden">
                  {user.profileImage ? (
                    <Image
                      src={user.profileImage}
                      alt={user.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-400">
                      {user.isBrand ? (
                        <Building className="w-16 h-16 text-white" />
                      ) : (
                        <User className="w-16 h-16 text-white" />
                      )}
                    </div>
                  )}
                </div>
                
                {/* 브랜드/인증 배지 */}
                {(user.isBrand || user.isVerified) && (
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                    {user.isBrand ? (
                      <Building className="w-6 h-6 text-purple-600" />
                    ) : (
                      <Crown className="w-6 h-6 text-yellow-500" />
                    )}
                  </div>
                )}
              </div>

              {/* 프로필 정보 */}
              <div className="flex-1">
                {/* 이름과 태그 */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center space-x-2">
                      <span>{user.name}</span>
                      {user.isVerified && (
                        <Crown className="w-6 h-6 text-yellow-500" />
                      )}
                    </h1>
                    <p className="text-gray-600">@{user.tagId}</p>
                  </div>
                  
                  {/* 브랜드 배지 */}
                  {user.isBrand && (
                    <div className="mt-2 sm:mt-0">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                        <Building className="w-4 h-4" />
                        <span>브랜드</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* 통계 */}
                <div className="flex space-x-6 mb-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">{user.postCount}</div>
                    <div className="text-sm text-gray-600">게시물</div>
                  </div>
                  <button className="text-center hover:text-purple-600 transition-colors">
                    <div className="text-xl font-bold text-gray-900">{user.followerCount}</div>
                    <div className="text-sm text-gray-600">팔로워</div>
                  </button>
                  <button className="text-center hover:text-purple-600 transition-colors">
                    <div className="text-xl font-bold text-gray-900">{user.followingCount}</div>
                    <div className="text-sm text-gray-600">팔로잉</div>
                  </button>
                </div>

                {/* 바이오 */}
                {user.bio && (
                  <p className="text-gray-800 mb-4 whitespace-pre-wrap">{user.bio}</p>
                )}

                {/* 추가 정보 */}
                <div className="space-y-2 text-sm text-gray-600">
                  {user.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user.website && (
                    <div className="flex items-center space-x-2">
                      <LinkIcon className="w-4 h-4" />
                      <a 
                        href={user.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-700"
                      >
                        {user.website}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(user.joinedAt).getFullYear()}년부터 활동</span>
                  </div>
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex space-x-3">
                {user.isOwnProfile ? (
                  <Link
                    href="/settings/profile"
                    className="flex items-center space-x-2 bg-gray-100 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                    <span>프로필 편집</span>
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={handleFollowToggle}
                      disabled={followLoading}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                        user.isFollowing
                          ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      {user.isFollowing ? (
                        <UserCheck className="w-5 h-5" />
                      ) : (
                        <UserPlus className="w-5 h-5" />
                      )}
                      <span>{followLoading ? '처리중...' : (user.isFollowing ? '팔로잉' : '팔로우')}</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 bg-gray-100 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>메시지</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 🔧 탭 네비게이션 */}
        <div className="bg-white border-t border-gray-200 sticky top-16 z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex">
              <button
                onClick={() => setActiveTab('posts')}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 border-t-2 transition-colors ${
                  activeTab === 'posts'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
                <span className="font-semibold">게시물</span>
              </button>
              
              {user.isOwnProfile && (
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 border-t-2 transition-colors ${
                    activeTab === 'saved'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                  <span className="font-semibold">저장됨</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 🔧 게시물 그리드 */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {posts.length > 0 ? (
            <div className="grid grid-cols-3 gap-1 md:gap-4">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.id}`}
                  className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden hover:opacity-90 transition-opacity group"
                >
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                  
                  {/* 호버 오버레이 */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex items-center space-x-4 text-white">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-5 h-5" />
                        <span className="font-semibold">{post.likeCount}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-semibold">{post.commentCount}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {activeTab === 'posts' ? '아직 게시물이 없습니다' : '저장된 게시물이 없습니다'}
              </h3>
              <p className="text-gray-600">
                {user.isOwnProfile 
                  ? '첫 번째 게시물을 공유해보세요!'
                  : `${user.name}님의 첫 번째 게시물을 기다려보세요`
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}