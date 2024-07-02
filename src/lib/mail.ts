import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(email : string, token : string) {
    console.log(`Sending token ${token} to ${email}`)
    const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`
    console.log(` Email response : ${JSON.stringify(await resend.emails.send({
        from : "onboarding@resend.dev",
        to : email,
        subject : "Verify your email",
        html : `<p>To confirm your email click <a href=${confirmationLink}>here</a></p>`
    }))}`)
}