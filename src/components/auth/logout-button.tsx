"use client"

import { signOut } from "next-auth/react"

interface LogoutButtonProps{
    children? : React.ReactNode
}

export default function LogoutButton({children} : LogoutButtonProps){
    
    return <span className="cursor-pointer flex justify-evenly items-center" onClick={() => signOut()} >
        {children}
    </span>
}