  "use server"
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export async function verifyEmail(token : string){
    let existingToken
    console.log(`Verifying email ...\nToken : ${token}`)
    try{
         existingToken = await getVerificationTokenByToken(token)
        console.log(`Existing token : ${JSON.stringify(existingToken)}`)
    if(!existingToken) {
        console.log(`Token not found`)

        return {error : "An unexpected error occurred"}
    }
    else if(new Date(existingToken.expires) < new Date()) return {error : "Token expired. Log in to resend"}
    else{
        const user = await getUserByEmail(existingToken.email)
        await db.user.update({
            data : {
                emailVerified : new Date()
            },
            where : {
                id : user?.id
            }
        })
        await db.verificationToken.delete({
            where : {
                id : existingToken.id
            }
        })
        return {success : "Email verified"}
    }
}
catch(error){
    console.log(`Error verifying token : ${error}`)
    return {error : "An unexpected error occurred."}
}
}