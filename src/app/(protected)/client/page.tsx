"use client"

import { UserInfo } from "@/components/auth/user-info"
import { useCurrentUser } from "@/custom hooks/useCurrentUser"

export default function ClientPage(){
    const user = useCurrentUser()
    return <div className="bg-white w-[600px] h-[600px] rounded-lg shadow-md flex flex-col  justify-center items-center mt-2">
    <h1>Client Page</h1>
    <UserInfo label="📱Client component" user={{...user}} />
        </div>
}