'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupFormSchema } from '@/lib/schemas'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { signupUserApi } from '@/lib/api'
import SignInputBox from '@/components/SignUp/SignInputBox'

export default function SignupPage() {
  const router = useRouter()

  //React Hook Form 설정
  const {
    register,
    handleSubmit,
    formState: { errors, isValidating, dirtyFields },
  } = useForm({
    resolver: zodResolver(signupFormSchema),
    mode: 'onBlur',
    defaultValues: {
      userId: '',
      password: '',
      confirmPassword: '',
      nickname: '',
      blogName: '', // 스키마에 추가된 필드
      blogSlug: '', // 스키마에 추가된 필드
    },
  })

  //   TanStack Query Mutation 설정
  const signupMutation = useMutation({
    mutationFn: signupUserApi,
    mode: 'onBlur',
    defaultValues: {
      userId: '',
      password: '',
      confirmPassword: '',
      nickname: '',
      blogName: '', // 스키마에 추가된 필드
      blogSlug: '', // 스키마에 추가된 필드
    },
  })

  const onSubmit = (data) => {
    signupMutation.mutate(data)
  }

  return (
    <div className="w-fullflex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl">
        <CardContent className="p-0">
          <form
            onSubmit={handleSubmit(onSubmit)} //핸들러 등록
            className="space-y-6 p-4"
          >
            {/* 섹션: 회원 정보 입력 */}
            <section>
              <h3 className="mb-4 text-sm font-semibold text-gray-700">회원 정보 입력</h3>

              <div className="rounded-0 divide-y overflow-hidden border border-gray-300">
                {/* 행 스타일: grid 12 컬럼 — 라벨 3 / 내용 9 */}
                <SignInputBox
                  label={'아이디'}
                  name={'userId'}
                  register={register}
                  error={errors.userId}
                  placeholder={'이메일 주소를 입력해주세요. (인증 시 필요)'}
                  className={'bg-white'}
                >
                  {/* 1. 검증 중일 때 (기존 코드) */}
                  {!errors.userId && isValidating && (
                    <p className="my-1 text-xs text-blue-500">중복 확인 중...</p>
                  )}
                  {/* 2. 검증 성공 시 (추가된 코드) */}
                  {!errors.userId && !isValidating && dirtyFields.userId && (
                    <p className="my-1 text-xs text-blue-500">사용 가능한 아이디입니다.</p>
                  )}
                </SignInputBox>
                <SignInputBox
                  label={'비밀번호'}
                  register={register}
                  name={'password'}
                  error={errors.password}
                  type={'password'}
                  placeholder={'영문, 숫자, 특수문자 포함 10자 이상'}
                  className={'bg-white'}
                ></SignInputBox>
                <SignInputBox
                  label={'비밀번호 확인'}
                  register={register}
                  name={'confirmPassword'}
                  error={errors.confirmPassword}
                  type={'password'}
                  placeholder={'비밀번호를 한번 더 입력해주세요'}
                  className={'bg-white'}
                ></SignInputBox>
                <SignInputBox
                  label={'닉네임'}
                  register={register}
                  name={'nickname'}
                  error={errors.nickname}
                  placeholder={'회원님을 나타내는 닉네임'}
                  className={'bg-white'}
                ></SignInputBox>
              </div>
            </section>

            {/* 섹션: 블로그 정보 입력 */}
            <section>
              <h3 className="mb-4 text-sm font-semibold text-gray-700">블로그 정보 입력</h3>

              <div className="rounded-0 divide-y overflow-hidden rounded-md border border-gray-300">
                <SignInputBox
                  label={'블로그 이름'}
                  register={register}
                  name={'blogName'}
                  placeholder={'블로그 이름을 입력하세요'}
                  className={'bg-white'}
                ></SignInputBox>

                <div className="grid grid-cols-12 items-center bg-white px-4 py-3">
                  <div className="col-span-3 text-sm text-gray-700">블로그 주소</div>
                  <div className="col-span-9 flex items-center gap-2 text-sm text-gray-500">
                    <Input
                      placeholder="영문 소문자, 숫자, 하이픈 입력 가능"
                      {...register('blogSlug')}
                    />
                    <span className="text-sm text-gray-400">.tistory.com</span>
                  </div>
                  <div className="col-span-3"></div>
                  <div className="col-span-9">
                    {errors.blogSlug && (
                      <p className="my-1 text-xs text-red-500">{errors.blogSlug.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* 하단 버튼 영역: 이전 / 다음 */}
            <div className="mt-4 flex items-center justify-center gap-4">
              <Button variant="outline">이전</Button>
              <Button
                type="submit"
                className="px-8"
                disabled={signupMutation.isPending} // 로딩 중 버튼 비활성화
              >
                {signupMutation.isPending ? '처리중...' : '가입'}
              </Button>
            </div>
          </form>
        </CardContent>
      </div>
    </div>
  )
}
