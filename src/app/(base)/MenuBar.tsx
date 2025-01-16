import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { Bell, Bookmark, HomeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import NotificationsButton from './NotificationButton'

interface MenuProp{
    className:string
}

async function MenuBar({className}:MenuProp) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) return null;
  
  
  const unreadNotificationCount = await prisma.notification.count({
    where: {
      recipientId: session.user.id,
      read: false,
    },
  });

  return (
    <div className={className}>
        <Button variant={"ghost"} className='flex items-center justify-start gap-3' asChild>
          <Link href={'/'} className=''>
            <HomeIcon></HomeIcon> <span className='hidden lg:inline'>Home</span>
          </Link>
        </Button>

        <Button variant={"ghost"} className='flex items-center justify-start gap-3' asChild>
        <NotificationsButton
        initialState={{ unreadCount: unreadNotificationCount }}
      />
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
