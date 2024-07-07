"use client"

import { useCurrentUser } from "@/custom hooks/useCurrentUser";
import { signOut, useSession } from "next-auth/react";

export default  function SettingsPage() {
  const user = useCurrentUser()
  return (
    <div className="bg-white w-[600px] h-[600px] rounded-lg shadow-md flex flex-col justify-center items-center mt-2">
<h1 className=" underline">Settings Page</h1>
      
      <p className="w-[90%] text-wrap break-words">{JSON.stringify(user)}</p>
      
        <button type="submit" className="border-2 border-black m-2 p-2 rounded-xl" onClick={() => signOut()}>Log out</button>
    </div>
    
  );
}
