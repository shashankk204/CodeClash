import { Button } from '@/components/ui/button'
import prisma from '@/lib/db'
import { Bell, Bookmark, HomeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface MenuProp{
    className:string
}

function MenuBar({className}:MenuProp) {
  return (
    <div className={className}>
        <Button variant={"ghost"} className='flex items-center justify-start gap-3' asChild>
          <Link href={'/'} className=''>
            <HomeIcon></HomeIcon> <span className='hidden lg:inline'>Home</span>
          </Link>
        </Button>

        <Button variant={"ghost"} className='flex items-center justify-start gap-3' asChild>
          <Link href={'/notifications'} className=''>
            <Bell></Bell> <span className='hidden lg:inline'>Notification</span>
          </Link>
        </Button>

        <Button variant={"ghost"} className='flex items-center justify-start gap-3' asChild>
          <Link href={'/bookmarks'} className=''>
            <Bookmark></Bookmark> <span className='hidden lg:inline'>BookMark</span>
          </Link>
        </Button>
        
    </div>
  )
}

export default MenuBar
