import { db } from "@/lib/db"

export async function getVerificationTokenByEmail(email:string) {
    console.log(`Geting verification token by email`)
    try {
        console.log(`Fetching verification token from database`)

        const verificationToken = await db.verificationToken.findFirst({
            where : {
                email
            }
        })
        console.log(`Returning Fetched verification token : ${verificationToken}`)


        return verificationToken
    } catch (error) {
        return null
    }
}
export async function getVerificationTokenByToken(token:string) {
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where : {
                token
            }
        })
        return verificationToken
    } catch (error) {
        return null
    }
}