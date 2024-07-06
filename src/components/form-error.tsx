"use client"

import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

interface FormErrorProps{
    message? : string
}

export default function FormError({message} : FormErrorProps){
    if(!message) return null
    return <div className="bg-destructive/15 p-3 rounded-md flex items-center justify-center text-sm text-destructive gap-2 m-2"><ExclamationTriangleIcon className="w-5 h-5 font-semibold"/>{message}</div>
}