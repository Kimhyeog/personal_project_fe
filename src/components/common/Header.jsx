'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

import Image from 'next/image'

import tistoryLogo from '@/assets/tistory_logo.svg'
import SearchBar from './SearchBar'
import Mainnav from './Mainnav'
import { useModalStore } from '@/stores/useModalStore'
import LoginConfirmModal from './LoginConfirmModal'

const Header = () => {
  const { openModal } = useModalStore() // 스토어에서 'openModal' 함수 가져오기

  return (
    <>
      <header className="flex w-full items-center justify-between px-10 py-6">
        <div className="flex items-center gap-10">
          <Link href={'/'} className="">
            <Image
              src={tistoryLogo}
              alt="Tistory Logo"
              width={120}
              height={30}
              priority // (선택) 헤더 로고는 LCP(최대 콘텐츠 풀 페인트) 성능을 위해 미리 로드 추천
            />
          </Link>
          <Mainnav />
        </div>
        <div className="flex items-center gap-10">
          <SearchBar className={'rounded-2xl'} />
          {/* 모달 열닫 핸들러 적용 */}
          <Button onClick={openModal} className={'whitespace-nowrap'} size={'sm'}>
            시작하기
          </Button>
        </div>
      </header>
      <LoginConfirmModal />
    </>
  )
}

export default Header
