import { db } from "@/lib/db"

export async function getTwoFactorConfirmationByUserId(id : string){
    try {
        const existingTwoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
            where : {userId : id}
        })
        return existingTwoFactorConfirmation
    } catch (error) {
        console.log(`Error fetching two factor confirmation : ${error}`)
        return null
    }
}