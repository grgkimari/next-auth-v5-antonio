"use client"

import { useCurrentUser } from "@/custom hooks/useCurrentUser"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { FaUser } from "react-icons/fa6"
import LogoutButton from "./logout-button"
import { ExitIcon } from "@radix-ui/react-icons"

export default function UserButton(){
    const user = useCurrentUser()
    return <DropdownMenu >
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src={user?.image || ""} className="rounded-full w-12"/>
                <AvatarFallback className="bg-sky-500">
                    <FaUser className=""/>
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 bg-white rounded-lg p-2" align="end">
            <DropdownMenuItem>
                <LogoutButton>
                    <ExitIcon />
                    Log out
                </LogoutButton>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}