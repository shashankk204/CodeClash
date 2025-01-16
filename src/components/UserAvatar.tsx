import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from '@/lib/utils'

interface AvatarProp{
    className? : string,
    url?:string,
    size?:string

}

function UserAvatar({className,url,size}:AvatarProp) {
  return (
<Avatar className={cn('select-none aspect-square h-fit flex-none rounded-full bg-secondary object-cover',className)}>
  <AvatarImage src={url || "https://github.com/shadcn.png"} width={size ?? 48} height={size ?? 48} />
  <AvatarFallback>DD</AvatarFallback>
</Avatar>

  )
}

export default UserAvatar
