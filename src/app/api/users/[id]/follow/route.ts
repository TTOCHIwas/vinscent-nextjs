import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { userQueries, followQueries } from '@/lib/db/queries';

// 🔧 팔로우하기 (POST)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const targetUserId = params.id;
    const session = await getServerSession(authOptions);
    
    // 🔧 로그인 확인
    if (!session?.user?.id) {
      return NextResponse.json({
        success: false,
        message: '로그인이 필요합니다.'
      }, { status: 401 });
    }

    const currentUserId = session.user.id;

    // 🔧 자기 자신 팔로우 방지
    if (currentUserId === targetUserId) {
      return NextResponse.json({
        success: false,
        message: '자기 자신을 팔로우할 수 없습니다.'
      }, { status: 400 });
    }

    // 🔧 타겟 사용자 존재 확인
    const targetUser = await userQueries.findByUserId(targetUserId);
    if (!targetUser) {
      return NextResponse.json({
        success: false,
        message: '사용자를 찾을 수 없습니다.'
      }, { status: 404 });
    }

    // 🔧 비활성화된 사용자 체크
    if (targetUser.user_status !== 1) {
      return NextResponse.json({
        success: false,
        message: '비활성화된 사용자를 팔로우할 수 없습니다.'
      }, { status: 403 });
    }

    // 🔧 이미 팔로우 중인지 확인
    const existingFollow = await followQueries.checkFollow(currentUserId, targetUserId);
    if (existingFollow) {
      return NextResponse.json({
        success: false,
        message: '이미 팔로우 중인 사용자입니다.'
      }, { status: 409 });
    }

    // 🔧 팔로우 관계 생성
    const followData = {
      follower_id: currentUserId,
      following_id: targetUserId,
      follow_created_date: new Date()
    };

    const followResult = await followQueries.createFollow(followData);
    
    if (!followResult) {
      throw new Error('팔로우 생성에 실패했습니다');
    }

    // 🔧 업데이트된 팔로워 수 조회
    const newFollowerCount = await userQueries.getFollowerCount(targetUserId);

    return NextResponse.json({
      success: true,
      message: `${targetUser.user_name}님을 팔로우했습니다.`,
      data: {
        isFollowing: true,
        followerCount: newFollowerCount,
        followedAt: followData.follow_created_date
      }
    });

  } catch (error) {
    console.error('🚨 팔로우 에러:', error);
    
    return NextResponse.json({
      success: false,
      message: '팔로우 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}

// 🔧 언팔로우하기 (DELETE)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const targetUserId = params.id;
    const session = await getServerSession(authOptions);
    
    // 🔧 로그인 확인
    if (!session?.user?.id) {
      return NextResponse.json({
        success: false,
        message: '로그인이 필요합니다.'
      }, { status: 401 });
    }

    const currentUserId = session.user.id;

    // 🔧 타겟 사용자 존재 확인
    const targetUser = await userQueries.findByUserId(targetUserId);
    if (!targetUser) {
      return NextResponse.json({
        success: false,
        message: '사용자를 찾을 수 없습니다.'
      }, { status: 404 });
    }

    // 🔧 팔로우 관계 확인
    const existingFollow = await followQueries.checkFollow(currentUserId, targetUserId);
    if (!existingFollow) {
      return NextResponse.json({
        success: false,
        message: '팔로우하지 않은 사용자입니다.'
      }, { status: 404 });
    }

    // 🔧 팔로우 관계 삭제
    const deleteResult = await followQueries.deleteFollow(currentUserId, targetUserId);
    
    if (!deleteResult) {
      throw new Error('언팔로우에 실패했습니다');
    }

    // 🔧 업데이트된 팔로워 수 조회
    const newFollowerCount = await userQueries.getFollowerCount(targetUserId);

    return NextResponse.json({
      success: true,
      message: `${targetUser.user_name}님을 언팔로우했습니다.`,
      data: {
        isFollowing: false,
        followerCount: newFollowerCount,
        unfollowedAt: new Date()
      }
    });

  } catch (error) {
    console.error('🚨 언팔로우 에러:', error);
    
    return NextResponse.json({
      success: false,
      message: '언팔로우 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}

// 🔧 팔로우 관계 조회 (GET)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const targetUserId = params.id;
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({
        success: false,
        message: '로그인이 필요합니다.'
      }, { status: 401 });
    }

    const currentUserId = session.user.id;

    // 🔧 팔로우 관계 확인
    const isFollowing = await followQueries.checkFollow(currentUserId, targetUserId);

    // 🔧 상호 팔로우 확인
    const isFollowingBack = await followQueries.checkFollow(targetUserId, currentUserId);

    return NextResponse.json({
      success: true,
      data: {
        isFollowing,
        isFollowingBack,
        relationshipType: isFollowing && isFollowingBack ? 'mutual' : 
                         isFollowing ? 'following' : 
                         isFollowingBack ? 'follower' : 'none'
      }
    });

  } catch (error) {
    console.error('🚨 팔로우 관계 조회 에러:', error);
    
    return NextResponse.json({
      success: false,
      message: '팔로우 관계 조회 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}