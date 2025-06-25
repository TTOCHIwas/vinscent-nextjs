import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    
    if (session) {
      return NextResponse.json({
        success: true,
        message: '인증된 사용자입니다.',
        user: session.user
      });
    } else {
      return NextResponse.json({
        success: false,
        message: '인증되지 않은 사용자입니다.'
      }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: '인증 확인 중 오류 발생',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    }, { status: 500 });
  }
}