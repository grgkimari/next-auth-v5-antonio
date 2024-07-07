"use client"
import UserButton from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar(){
    const currentPath = usePathname()
    return <div className="bg-white w-[600px] rounded-lg shadow-sm p-2 flex justify-evenly">
        <Button asChild variant={currentPath === "/settings" ? "default" : "outline"}>
            <Link href={"/settings"} >Settings</Link>
        </Button>
        <Button asChild variant={currentPath === "/server" ? "default" : "outline"}>
            <Link href={"/server"} >Server</Link>
        </Button>
        <Button asChild variant={currentPath === "/client" ? "default" : "outline"}>
            <Link href={"/client"} >Client</Link>
        </Button>
        <Button asChild variant={currentPath === "/admin" ? "default" : "outline"}>
            <Link href={"/admin"} >Admin</Link>
        </Button>
        <UserButton />
    </div>
}