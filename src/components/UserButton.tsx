"use client"

import React from 'react'
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
import { Check, LogOutIcon, Monitor, Moon, Sun, TicketCheck, TicketCheckIcon, UserIcon, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

interface UserBottomProps {
    className?: string

}

function UserButton({ className }: UserBottomProps) {
    // const url="https://github.com/shadcn.png";
    // const hmm=;
    const {theme,setTheme}=useTheme();
    const UserName = "dummy";
    return (
        <div>
            <DropdownMenu >
                <DropdownMenuTrigger className='rounded-full' >
                    <UserAvatar url={undefined}></UserAvatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>

                    <DropdownMenuLabel>
                        Hello @DummyUser
                    </DropdownMenuLabel>


                    <DropdownMenuSeparator />


                    <DropdownMenuItem >
                        <Link href={`/users/${UserName}`} className='flex space-x-2' >
                            <UserIcon />
                            <span>
                                Profile
                            </span>
                        </Link>
                    </DropdownMenuItem>


                    <DropdownMenuSeparator />



                    <DropdownMenuItem onClick={() => { console.log("logged out") }}>
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
                                
                                
                                <DropdownMenuItem onClick={()=>{setTheme("light")}}>
                                    <Sun />
                                    <span>Light</span>
                                    {(theme==="light")?<Check />:<></>}
                                </DropdownMenuItem>


                                <DropdownMenuItem onClick={()=>{setTheme("dark")}}>
                                    <Moon />
                                    <span> Dark</span>
                                    {(theme==="dark")?<Check />:<></>}

                                </DropdownMenuItem>

                                
                                <DropdownMenuSeparator />


                                <DropdownMenuItem onClick={()=>{setTheme("system")}}>
                                    <Monitor />
                                    <span className='px-1'>
                                        System Default
                                    </span>
                                    {(theme==="system")?<Check />:<></>}

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
