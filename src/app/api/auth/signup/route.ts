import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { userQueries } from '@/lib/db/queries';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      userType,
      userId,
      tagId,
      password,
      confirmPassword,
      name,
      phone,
      birth,
      businessType,
      corporateName,
      corporateId1,
      corporateId2,
      adultAgree,
      storeAgree,
      marketingAgree,
      apAgree
    } = body;

    // 🔧 입력 데이터 검증
    if (!userId || !tagId || !password || !name) {
      return NextResponse.json({
        success: false,
        message: '필수 정보를 모두 입력해주세요.'
      }, { status: 400 });
    }

    // 🔧 비밀번호 확인
    if (password !== confirmPassword) {
      return NextResponse.json({
        success: false,
        message: '비밀번호가 일치하지 않습니다.'
      }, { status: 400 });
    }

    // 🔧 비밀번호 길이 검증
    if (password.length < 8) {
      return NextResponse.json({
        success: false,
        message: '비밀번호는 8자 이상이어야 합니다.'
      }, { status: 400 });
    }

    // 🔧 필수 약관 동의 확인
    if (!adultAgree || !storeAgree || !apAgree) {
      return NextResponse.json({
        success: false,
        message: '필수 약관에 동의해주세요.'
      }, { status: 400 });
    }

    // 🔧 브랜드 회원 추가 검증
    if (userType === '1') {
      if (!businessType || !corporateName) {
        return NextResponse.json({
          success: false,
          message: '브랜드 정보를 모두 입력해주세요.'
        }, { status: 400 });
      }
    }

    // 🔧 사용자 ID 중복 검사
    const existingUserById = await userQueries.findByUserId(userId);
    if (existingUserById) {
      return NextResponse.json({
        success: false,
        message: '이미 사용중인 아이디입니다.'
      }, { status: 409 });
    }

    // 🔧 태그 ID 중복 검사
    const existingUserByTag = await userQueries.findByTagId(tagId);
    if (existingUserByTag) {
      return NextResponse.json({
        success: false,
        message: '이미 사용중인 태그 ID입니다.'
      }, { status: 409 });
    }

    // 🔧 비밀번호 해싱 (기존 bcrypt 호환)
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 🔧 사용자 데이터 생성
    const userData = {
      user_id: userId,
      user_tag_id: tagId,
      user_pw: hashedPassword,
      user_name: name,
      user_phone: phone || null,
      user_birth: birth || null,
      user_type: parseInt(userType), // 0: 개인, 1: 브랜드
      user_brand: parseInt(userType), // user_type과 동일하게 설정
      business_type: businessType || null,
      corporate_name: corporateName || null,
      corporate_id1: corporateId1 || null,
      corporate_id2: corporateId2 || null,
      user_created_date: new Date(),
      user_status: 1, // 활성 상태
      user_email_verified: 0, // 미인증 (향후 이메일 인증 기능)
      user_profile_image: null,
      user_bio: null,
      user_location: null,
      user_website: null
    };

    // 🔧 사용자 생성
    const newUser = await userQueries.create(userData);
    
    if (!newUser) {
      throw new Error('사용자 생성에 실패했습니다');
    }

    // 🔧 약관 동의 정보 저장
    const termData = {
      user_id: userId,
      adult_agree: adultAgree ? 1 : 0,
      store_agree: storeAgree ? 1 : 0,
      marketing_agree: marketingAgree ? 1 : 0,
      ap_agree: apAgree ? 1 : 0,
      agreed_at: new Date()
    };

    await userQueries.createUserTerms(termData);

    // 🔧 성공 응답 (비밀번호 제외)
    const { user_pw, ...safeUserData } = userData;
    
    return NextResponse.json({
      success: true,
      message: '회원가입이 완료되었습니다.',
      data: {
        userId: safeUserData.user_id,
        tagId: safeUserData.user_tag_id,
        name: safeUserData.user_name,
        userType: safeUserData.user_type,
        isBrand: safeUserData.user_brand === 1
      }
    }, { status: 201 });

  } catch (error) {
    console.error('🚨 회원가입 API 에러:', error);
    
    // 🔧 데이터베이스 제약 조건 에러 처리
    if (error instanceof Error) {
      if (error.message.includes('Duplicate entry')) {
        return NextResponse.json({
          success: false,
          message: '이미 사용중인 정보입니다. 다른 정보를 입력해주세요.'
        }, { status: 409 });
      }
      
      if (error.message.includes('constraint')) {
        return NextResponse.json({
          success: false,
          message: '입력 정보가 올바르지 않습니다.'
        }, { status: 400 });
      }
    }

    return NextResponse.json({
      success: false,
      message: '회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
    }, { status: 500 });
  }
}