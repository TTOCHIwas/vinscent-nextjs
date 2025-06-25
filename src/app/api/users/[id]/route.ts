import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth-options';
import { userQueries } from '@/lib/db/queries';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id;

    // 🔧 사용자 기본 정보 조회
    const user = await userQueries.findByUserId(userId);
    
    if (!user) {
      return NextResponse.json({
        success: false,
        message: '사용자를 찾을 수 없습니다.'
      }, { status: 404 });
    }

    // 🔧 비활성화된 사용자 체크
    if (user.user_status !== 1) {
      return NextResponse.json({
        success: false,
        message: '비활성화된 사용자입니다.'
      }, { status: 403 });
    }

    // 🔧 팔로우/팔로워 통계 조회
    const [followerCount, followingCount] = await Promise.all([
      userQueries.getFollowerCount(userId),
      userQueries.getFollowingCount(userId)
    ]);

    // 🔧 게시글 수 조회
    const postCount = await userQueries.getPostCount(userId);

    // 🔧 현재 사용자와의 관계 확인
    let isFollowing = false;
    let isOwnProfile = false;
    
    if (currentUserId) {
      isOwnProfile = currentUserId === userId;
      
      if (!isOwnProfile) {
        isFollowing = await userQueries.checkFollowRelation(currentUserId, userId);
      }
    }

    // 🔧 안전한 사용자 정보 구성 (비밀번호 등 민감 정보 제외)
    const profileData = {
      id: user.user_id,
      tagId: user.user_tag_id,
      name: user.user_name,
      bio: user.user_bio || '',
      profileImage: user.user_profile_image,
      isBrand: user.user_brand === 1,
      isVerified: user.user_verified === 1,
      location: user.user_location,
      website: user.user_website,
      joinedAt: user.user_created_date,
      
      // 통계 정보
      postCount: postCount || 0,
      followerCount: followerCount || 0,
      followingCount: followingCount || 0,
      
      // 관계 정보
      isFollowing,
      isOwnProfile,
      
      // 브랜드 전용 정보 (브랜드인 경우만)
      ...(user.user_brand === 1 && {
        businessType: user.business_type,
        corporateName: user.corporate_name,
        businessEmail: user.business_email,
        businessPhone: user.business_phone
      })
    };

    return NextResponse.json({
      success: true,
      message: '사용자 정보를 성공적으로 조회했습니다.',
      data: profileData
    });

  } catch (error) {
    console.error('🚨 사용자 프로필 조회 에러:', error);
    
    return NextResponse.json({
      success: false,
      message: '사용자 정보 조회 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}

// 🔧 프로필 업데이트 (자신의 프로필만 수정 가능)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const session = await getServerSession(authOptions);
    
    // 🔧 인증 확인
    if (!session?.user?.id) {
      return NextResponse.json({
        success: false,
        message: '로그인이 필요합니다.'
      }, { status: 401 });
    }

    // 🔧 본인 프로필만 수정 가능
    if (session.user.id !== userId) {
      return NextResponse.json({
        success: false,
        message: '본인의 프로필만 수정할 수 있습니다.'
      }, { status: 403 });
    }

    const body = await request.json();
    const { name, bio, location, website } = body;

    // 🔧 입력 데이터 검증
    if (name && name.length > 50) {
      return NextResponse.json({
        success: false,
        message: '이름은 50자 이하여야 합니다.'
      }, { status: 400 });
    }

    if (bio && bio.length > 200) {
      return NextResponse.json({
        success: false,
        message: '소개는 200자 이하여야 합니다.'
      }, { status: 400 });
    }

    // 🔧 웹사이트 URL 검증
    if (website && !isValidUrl(website)) {
      return NextResponse.json({
        success: false,
        message: '올바른 웹사이트 URL을 입력해주세요.'
      }, { status: 400 });
    }

    // 🔧 프로필 업데이트
    const updateData = {
      user_name: name,
      user_bio: bio,
      user_location: location,
      user_website: website,
      user_updated_date: new Date()
    };

    const updated = await userQueries.updateProfile(userId, updateData);
    
    if (!updated) {
      throw new Error('프로필 업데이트에 실패했습니다');
    }

    return NextResponse.json({
      success: true,
      message: '프로필이 성공적으로 업데이트되었습니다.',
      data: updateData
    });

  } catch (error) {
    console.error('🚨 프로필 업데이트 에러:', error);
    
    return NextResponse.json({
      success: false,
      message: '프로필 업데이트 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}

// 🔧 URL 유효성 검사 헬퍼 함수
function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}