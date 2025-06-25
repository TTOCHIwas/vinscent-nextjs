'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import MainLayout from '@/components/layout/MainLayout';
import { Eye, EyeOff, User, Building, Sparkles } from 'lucide-react';

interface SignupFormData {
  userType: '0' | '1'; // 0: 개인, 1: 브랜드
  userId: string;
  tagId: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone?: string;
  birth?: string;
  
  // 브랜드 전용 필드
  businessType?: string;
  corporateName?: string;
  corporateId1?: string;
  corporateId2?: string;
  
  // 약관 동의
  adultAgree: boolean;
  storeAgree: boolean;
  marketingAgree: boolean;
  apAgree: boolean;
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SignupFormData>({
    defaultValues: {
      userType: '0', // 기본값: 개인 회원
      marketingAgree: false
    }
  });

  const userType = watch('userType');
  const password = watch('password');

  // 🔧 회원가입 처리 함수
  const onSubmit = async (data: SignupFormData) => {
    setError('');
    setLoading(true);

    try {
      // 🔧 비밀번호 확인
      if (data.password !== data.confirmPassword) {
        setError('비밀번호가 일치하지 않습니다.');
        setLoading(false);
        return;
      }

      // 🔧 필수 약관 확인
      if (!data.adultAgree || !data.storeAgree || !data.apAgree) {
        setError('필수 약관에 동의해주세요.');
        setLoading(false);
        return;
      }

      // 🔧 회원가입 API 호출
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        alert('회원가입이 완료되었습니다! 로그인해주세요.');
        router.push('/auth/login');
      } else {
        setError(result.message || '회원가입 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* 🔧 헤더 */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-12 h-12 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Vinscent 회원가입
            </h1>
            <p className="text-gray-600">
              향기로운 소셜 플랫폼에 오신 것을 환영합니다
            </p>
          </div>

          {/* 🔧 회원가입 폼 */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* 🔧 회원 유형 선택 */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  회원 유형 *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    userType === '0' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      value="0"
                      {...register('userType', { required: true })}
                      className="sr-only"
                    />
                    <User className="w-6 h-6 mr-3 text-purple-600" />
                    <div>
                      <div className="font-semibold text-gray-900">개인 회원</div>
                      <div className="text-sm text-gray-600">일반 사용자</div>
                    </div>
                  </label>
                  
                  <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    userType === '1' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      value="1"
                      {...register('userType', { required: true })}
                      className="sr-only"
                    />
                    <Building className="w-6 h-6 mr-3 text-purple-600" />
                    <div>
                      <div className="font-semibold text-gray-900">브랜드 회원</div>
                      <div className="text-sm text-gray-600">기업/브랜드</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* 🔧 기본 정보 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    아이디 *
                  </label>
                  <input
                    type="text"
                    {...register('userId', {
                      required: '아이디를 입력해주세요',
                      minLength: { value: 4, message: '4자 이상 입력해주세요' },
                      pattern: { value: /^[a-zA-Z0-9_]+$/, message: '영문, 숫자, _만 사용 가능합니다' }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="영문, 숫자, _ 조합"
                  />
                  {errors.userId && (
                    <p className="text-red-500 text-sm mt-1">{errors.userId.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    태그 ID *
                  </label>
                  <input
                    type="text"
                    {...register('tagId', {
                      required: '태그 ID를 입력해주세요',
                      minLength: { value: 2, message: '2자 이상 입력해주세요' }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="@username 형태"
                  />
                  {errors.tagId && (
                    <p className="text-red-500 text-sm mt-1">{errors.tagId.message}</p>
                  )}
                </div>
              </div>

              {/* 🔧 비밀번호 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    비밀번호 *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', {
                        required: '비밀번호를 입력해주세요',
                        minLength: { value: 8, message: '8자 이상 입력해주세요' }
                      })}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="8자 이상"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    비밀번호 확인 *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...register('confirmPassword', {
                        required: '비밀번호 확인을 입력해주세요',
                        validate: value => value === password || '비밀번호가 일치하지 않습니다'
                      })}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="비밀번호 재입력"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              {/* 🔧 이름 */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {userType === '1' ? '담당자명 *' : '이름 *'}
                </label>
                <input
                  type="text"
                  {...register('name', { required: '이름을 입력해주세요' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={userType === '1' ? '담당자명' : '실명'}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* 🔧 브랜드 전용 정보 */}
              {userType === '1' && (
                <div className="space-y-4 p-4 bg-purple-50 rounded-xl">
                  <h3 className="font-semibold text-purple-900">브랜드 정보</h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      사업자 유형 *
                    </label>
                    <select
                      {...register('businessType', { required: userType === '1' ? '사업자 유형을 선택해주세요' : false })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">선택해주세요</option>
                      <option value="individual">개인사업자</option>
                      <option value="corporation">법인사업자</option>
                    </select>
                    {errors.businessType && (
                      <p className="text-red-500 text-sm mt-1">{errors.businessType.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      상호명/법인명 *
                    </label>
                    <input
                      type="text"
                      {...register('corporateName', { required: userType === '1' ? '상호명을 입력해주세요' : false })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="브랜드/회사명"
                    />
                    {errors.corporateName && (
                      <p className="text-red-500 text-sm mt-1">{errors.corporateName.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* 🔧 약관 동의 */}
              <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900">약관 동의</h3>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    {...register('adultAgree', { required: '만 14세 이상 확인은 필수입니다' })}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    [필수] 만 14세 이상입니다
                  </span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    {...register('storeAgree', { required: '이용약관 동의는 필수입니다' })}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    [필수] 이용약관 동의
                  </span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    {...register('apAgree', { required: '개인정보처리방침 동의는 필수입니다' })}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    [필수] 개인정보처리방침 동의
                  </span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    {...register('marketingAgree')}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    [선택] 마케팅 정보 수신 동의
                  </span>
                </label>
              </div>

              {/* 🔧 에러 메시지 */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* 🔧 회원가입 버튼 */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? '가입 중...' : '회원가입 완료'}
              </button>
            </form>

            {/* 🔧 로그인 링크 */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                이미 계정이 있으신가요?{' '}
                <Link href="/auth/login" className="text-purple-600 font-semibold hover:text-purple-700">
                  로그인하기
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}