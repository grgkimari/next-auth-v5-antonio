"use server"
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetLinkEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

export async function SendPasswordResetLink(email : string){
    console.log(`Resetting password for user : ${email}`)
    try{
        const existingUser = await getUserByEmail(email)
        
        if(existingUser){
            const passwordResetToken = await generateVerificationToken(email)
            if(passwordResetToken){
                 await sendPasswordResetLinkEmail(email,passwordResetToken.token)
                return {success : "Password reset link sent"}

            }
        }
        return {error : "An unexpected error occurred"}
    }
    catch(error){
        console.log(`Error sending password reset email : ${error}`)
        return {error : "An unexpected error occurred"}
    }
}