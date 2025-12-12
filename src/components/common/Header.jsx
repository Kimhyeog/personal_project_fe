import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <header>
        <Link href={"/"} className=''>
        Board Project
        </Link>
        <Link href={"/login"}>
            <Button variant={"outline"} size={"sm"}>로그인</Button>
        </Link>
        <Link href={"/singup"}>
            <Button size={"sm"}>로그인</Button>
        </Link>
    </header>
  )
}

export default Header