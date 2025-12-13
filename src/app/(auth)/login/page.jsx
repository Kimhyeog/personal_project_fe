'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
const page = () => {
  const { register, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: {
      userID: '',
      password: '',
    },
  })

  return (
    <div className="flex flex-col items-center justify-center">
      <form className="flex flex-col justify-center gap-5">
        <label className="w-full text-center text-2xl">티스토리에 로그인 좆까세요.</label>
        <div>
          <Input placeholder={'ID'} className={'rounded-none'} />
          <Input placeholder={'Password'} className={'rounded-none'} />
        </div>
        <div>
          <Button className={'w-full rounded-none bg-gray-400'}>로그인</Button>
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
