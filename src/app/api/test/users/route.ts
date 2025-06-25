import { NextResponse } from 'next/server';
import { userQueries } from '@/lib/db/queries';

export async function GET() {
  try {
    const users = await userQueries.findAll();
    
    return NextResponse.json({
      success: true,
      message: `${users.length}명의 사용자를 찾았습니다.`,
      data: users
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: '사용자 조회 중 오류 발생',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    }, { status: 500 });
  }
}