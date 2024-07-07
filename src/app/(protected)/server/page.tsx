import { auth } from "@/auth"
import { UserInfo } from "@/components/auth/user-info"

export default async function ServerPage(){
    const session = await auth()
    return <div className="bg-white w-[600px] h-[600px] rounded-lg shadow-md flex flex-col  justify-center items-center mt-2 p-2">
    <h1>Server Page</h1>
    <UserInfo user={session?.user} label="💻Server Component"/>
        </div>
}