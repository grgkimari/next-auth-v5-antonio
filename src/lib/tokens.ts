import { getVerificationTokenByEmail } from "@/data/verification-token";
import { db } from "./db";
import {v4 as UUIDv4} from 'uuid'

export async function generateVerificationToken(email : string){
    //Check for existing verification token for the current email and delete it
    try{
        const existingToken = await getVerificationTokenByEmail(email)
        console.log(`Checking for Existing token : ${JSON.stringify(existingToken)}`)

        if(existingToken){
            console.log(`Deleting Existing token : ${JSON.stringify(existingToken)}`)

            await db.verificationToken.delete({
                where : {
                    id : existingToken.id
                }
            })
        }


        const newToken = UUIDv4()
        console.log(`Generated new token : ${newToken}`)

        const expires = new Date(new Date().getTime() + (900 * 1000))

        console.log(`Saving to db`)

        const newVerificationToken = await db.verificationToken.create({
            data: {
                token : newToken,
                expires,
                email
            }
        })
        console.log(`Saved token : ${JSON.stringify(newVerificationToken)}`)

        return newVerificationToken
    }
    catch(error){
        console.log(`Error : ${error}`)
        return null
    }
}