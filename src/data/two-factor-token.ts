import { db } from "@/lib/db"

export async function getTwoFactorTokenByToken(token : string){
    try {
        const existingToken = await db.twoFactorToken.findUnique({
            where : { token}
        })
        return existingToken
    } catch (error) {
        console.error(`Error fetching token : ${error}`)
        return null
    }
}
export async function getTwoFactorTokenByEmail(email : string){
    try {
        const existingToken = await db.twoFactorToken.findFirst({
            where : { email}
        })
        return existingToken
    } catch (error) {
        console.error(`Error fetching token : ${error}`)
        return null
    }
}