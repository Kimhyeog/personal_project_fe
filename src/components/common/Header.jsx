import Link from 'next/link'
import { Button } from '@/components/ui/button'

import Image from 'next/image'

import tistoryLogo from '@/assets/tistory_logo.svg'
import SearchBar from './SearchBar'
import Mainnav from './Mainnav'

const Header = () => {
  return (
    <header className="flex w-full items-center justify-between px-10 py-6">
      <div>
        <Link href={'/'} className="">
          <Image
            src={tistoryLogo}
            alt="Tistory Logo"
            width={120}
            height={30}
            priority // (선택) 헤더 로고는 LCP(최대 콘텐츠 풀 페인트) 성능을 위해 미리 로드 추천
          />
        </Link>
      </div>
      <div>
        <Mainnav />
      </div>
      <div>
        <SearchBar />
      </div>
      <div className="flex items-center justify-center gap-3">
        <Link href={'/login'}>
          <Button size={'sm'}>시작하기</Button>
        </Link>
      </div>
    </header>
  )
}

export default Header
