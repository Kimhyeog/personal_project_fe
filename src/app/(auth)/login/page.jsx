'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loginUserApi } from '@/lib/api'
import { loginSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
const page = () => {
  // 택배 포장 : 코드가 클라이언트가 입력한 값들을 포장하는 작업
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema), // zod에 연결 방법

    mode: 'onBlur',
    defaultValues: {
      userId: '',
      password: '',
    },
  })

  // 배송 작업 : useMutation
  const loginMutation = useMutation({
    mutationFn: loginUserApi,
    onSuccess: (data) => {
      alert(data.message)
    },
    onError: (error) => {
      alert(error.message)
    },
  })

  // 배송 시작 핸들러
  const onSubmit = (data) => {
    console.log('로그인 입력폼에서 받은 데이터', data)

    loginMutation.mutate(data)
  }

  // 입력 폼에 대한 핸들러 처리
  const onInvalid = (errors) => {
    const firstErrorkey = Object.keys(errors)[0]

    switch (firstErrorkey) {
      case 'userId':
        alert(errors.userId.message)
        break
      case 'password':
        alert(errors.password.message)
        break
      default:
        break
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="flex flex-col justify-center gap-5"
      >
        <label className="w-full text-center text-2xl">티스토리에 로그인 좆까세요.</label>
        <div>
          <Input {...register('userId')} placeholder={'ID'} className={'rounded-none'} />
          <Input {...register('password')} placeholder={'Password'} className={'rounded-none'} />
        </div>
        <div>
          <Button
            type={'submit'}
            onSubmit={loginMutation.mutate}
            disabled={loginMutation.isPending}
            className={'w-full rounded-none bg-gray-400'}
          >
            {loginMutation.isPending ? '처리중..' : '로그인'}
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-1">
            <label className="text-sm whitespace-nowrap">로그인 상태 유지</label>
            <Input type={'radio'} />
          </div>
          <div>
            <Link href={''}> 아이디</Link>
            <span> | </span>
            <Link href={''}>비밀번호 찾기</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default page
