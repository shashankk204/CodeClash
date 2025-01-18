"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatar from './UserAvatar'
import { Check, LogOutIcon, Monitor, Moon, Sun, UserIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import logout from '@/app/(auth)/action'
import { useQueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import useFixSession from "@/hooks/use-Fix-useSession"

interface UserBottomProps {
    className?: string

}

function UserButton({ className }: UserBottomProps) {
    const queryClient = useQueryClient();
    const { theme, setTheme } = useTheme();
    let user = useFixSession();
    

    const bool = false;
    
    
    

    return (bool ? <div className={className}></div> :
        <div>
            <DropdownMenu >
                <DropdownMenuTrigger className='rounded-full' disabled={user.status === "loading"}>
                    <UserAvatar url={undefined}></UserAvatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>

                    <DropdownMenuLabel>
                        Hello {user.data?.user?.name}
                    </DropdownMenuLabel>


                    <DropdownMenuSeparator />


                    <DropdownMenuItem onClick={async() => { redirect(`/users/${user.data?.user?.name}`) }}>
                        <UserIcon />
                        <span>Profile</span>
                    </DropdownMenuItem>


                    <DropdownMenuSeparator />



                    <DropdownMenuItem onClick={async () => {
                        queryClient.clear();
                        await logout()
                    }}>
                        <LogOutIcon />
                        <span> Logout </span>
                    </DropdownMenuItem>



                    <DropdownMenuSeparator />



                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <Monitor />
                            <span>Theme</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>


                                <DropdownMenuItem onClick={() => { setTheme("light") }}>
                                    <Sun />
                                    <span>Light</span>
                                    {(theme === "light") ? <Check /> : <></>}
                                </DropdownMenuItem>


                                <DropdownMenuItem onClick={() => { setTheme("dark") }}>
                                    <Moon />
                                    <span> Dark</span>
                                    {(theme === "dark") ? <Check /> : <></>}

                                </DropdownMenuItem>


                                <DropdownMenuSeparator />


                                <DropdownMenuItem onClick={() => { setTheme("system") }}>
                                    <Monitor />
                                    <span className='px-1'>
                                        System Default
                                    </span>
                                    {(theme === "system") ? <Check /> : <></>}

                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>





                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default UserButton
