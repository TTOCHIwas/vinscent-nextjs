import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { postQueries, userQueries } from '@/lib/db/queries';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const { searchParams } = new URL(request.url);
    
    // 🔧 쿼리 파라미터 파싱
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const type = searchParams.get('type') || 'posts'; // posts, saved, magazine
    
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id;

    // 🔧 사용자 존재 확인
    const user = await userQueries.findByUserId(userId);
    if (!user) {
      return NextResponse.json({
        success: false,
        message: '사용자를 찾을 수 없습니다.'
      }, { status: 404 });
    }

    // 🔧 본인 여부 확인
    const isOwnProfile = currentUserId === userId;

    let posts = [];
    let totalCount = 0;

    switch (type) {
      case 'posts':
        // 🔧 일반 게시글 조회
        const postsResult = await postQueries.findByUserId(userId, {
          page,
          limit,
          includePrivate: isOwnProfile // 본인만 비공개 게시글 포함
        });
        posts = postsResult.posts;
        totalCount = postsResult.totalCount;
        break;

      case 'saved':
        // 🔧 저장된 게시글 (본인만 조회 가능)
        if (!isOwnProfile) {
          return NextResponse.json({
            success: false,
            message: '본인의 저장된 게시글만 조회할 수 있습니다.'
          }, { status: 403 });
        }
        
        const savedResult = await postQueries.findSavedByUserId(userId, {
          page,
          limit
        });
        posts = savedResult.posts;
        totalCount = savedResult.totalCount;
        break;

      case 'magazine':
        // 🔧 매거진 게시글 (브랜드 회원만)
        if (user.user_brand !== 1) {
          return NextResponse.json({
            success: false,
            message: '브랜드 회원의 매거진만 조회할 수 있습니다.'
          }, { status: 400 });
        }
        
        const magazineResult = await postQueries.findMagazineByUserId(userId, {
          page,
          limit,
          includePrivate: isOwnProfile
        });
        posts = magazineResult.posts;
        totalCount = magazineResult.totalCount;
        break;

      default:
        return NextResponse.json({
          success: false,
          message: '잘못된 조회 타입입니다.'
        }, { status: 400 });
    }

    // 🔧 Instagram 그리드용 데이터 구조로 변환
    const formattedPosts = posts.map(post => ({
      id: post.post_id,
      image: post.thumbnail_url || post.first_image_url || '/images/placeholder.jpg',
      likeCount: post.like_count || 0,
      commentCount: post.comment_count || 0,
      isVideo: post.is_video || false,
      isPrivate: post.post_privacy === 1,
      isMagazine: post.magazine === 1,
      createdAt: post.post_created_date,
      
      // 🔧 미리보기용 추가 정보
      caption: post.post_content ? post.post_content.substring(0, 100) : '',
      hashtags: post.hashtags || [],
      
      // 🔧 상호작용 정보 (로그인한 사용자만)
      ...(currentUserId && {
        isLiked: post.is_liked_by_current_user || false,
        isSaved: post.is_saved_by_current_user || false
      })
    }));

    // 🔧 페이지네이션 메타데이터
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      success: true,
      message: `${type} 목록을 성공적으로 조회했습니다.`,
      data: formattedPosts,
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage,
        hasPrevPage,
        type
      }
    });

  } catch (error) {
    console.error('🚨 사용자 게시글 조회 에러:', error);
    
    return NextResponse.json({
      success: false,
      message: '게시글 목록 조회 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}