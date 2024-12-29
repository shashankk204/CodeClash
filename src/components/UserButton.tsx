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
import { LogOutIcon, Mail, MailIcon, MessageSquare, Monitor, Moon, PlusCircle, Sun, UserIcon, UserPlus } from 'lucide-react'
import Link from 'next/link'

interface UserBottomProps {
    className?: string

}

function UserButton({ className }: UserBottomProps) {
    // const url="https://github.com/shadcn.png";
    // const hmm=;

    const UserName = "dummy";

    return (
        <div>

            <DropdownMenu >
                <DropdownMenuTrigger className='rounded-full' >

                    <UserAvatar url={"dummy data"}></UserAvatar>
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
                            <UserPlus />
                            <span>Invite users</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                    <Sun />
                                    <span>Light</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Moon />
                                    <span>Dark</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Monitor />
                                    <span className='px-1'>System Default</span>
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
