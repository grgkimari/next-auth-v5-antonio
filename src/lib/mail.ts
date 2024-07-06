"use server"
import { error } from "console";
import { Resend } from "resend";

const resendAPIKey = process.env.RESEND_API_KEY
const resend = new Resend(resendAPIKey)

export async function sendVerificationEmail(email : string, token : string) {
    const url = new URL('http://localhost:3000/auth/new-verification')
    const params = new URLSearchParams()
    params.set("token", token)
    url.search = params.toString()
    console.log(`Sending token ${token} to ${email}`)
    const confirmationLink = url.href
    const emailSendingResponse = await resend.emails.send({
        from : "onboarding@resend.dev",
        to : email,
        subject : "Verify your email",
        html : `<p>To confirm your email click <a href=${confirmationLink}>here</a></p>`
    })
    if(emailSendingResponse.error) throw new Error(emailSendingResponse.error.message)
}

export async function sendPasswordResetLinkEmail(email : string, token : string) {
    const url = new URL('http://localhost:3000/auth/set-new-password')
    const params = new URLSearchParams()
    params.set("token", token)
    url.search = params.toString()
    console.log(`Sending token ${token} to ${email}`)
    const confirmationLink = url.href
    const emailSendingResponse = await resend.emails.send({
        from : "onboarding@resend.dev",
        to : email,
        subject : "Password reset link",
        html : `<p>To reset your password click <a href=${confirmationLink}>here</a></p>`
    })
    if(emailSendingResponse.error) throw new Error(emailSendingResponse.error.message)

}

export async function sendTwoFactorTokenEmail(email : string, token : string){
    const emailSendingResponse = await resend.emails.send({
        from : "onboarding@resend.dev",
        to : email,
        subject : "Two factor authentication code",
        html : `<p>Your two factor authentication code is : <h3>${token}</h3> <p>`
    })
    if(emailSendingResponse.error) throw new Error(emailSendingResponse.error.message)

}