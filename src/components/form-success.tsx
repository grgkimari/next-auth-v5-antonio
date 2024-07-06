"use client"

import { CheckCircledIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons"

interface FormErrorProps{
    message? : string
}

export default function FormSuccess({message} : FormErrorProps){
    if(!message) return null
    return <div className="bg-emerald-200/15 p-3 rounded-md flex items-center justify-center text-sm text-emerald-400 gap-2 m-2"><CheckCircledIcon className="w-5 h-5 font-semibold"/>{message}</div>
}