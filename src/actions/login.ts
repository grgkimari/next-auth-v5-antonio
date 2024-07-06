"use server";

import { signIn } from "@/auth";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { defaultLoginRedirect } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";

import * as z from "zod";

export default async function Login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid input detected" };
  }
  const { email, password, code } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email not found." };
  }
  if (!existingUser.emailVerified) {


    const newVerificationToken = await generateVerificationToken(
      existingUser.email
    );
    
    if (newVerificationToken) {
      await sendVerificationEmail(email, newVerificationToken?.token);
      return { success: "Confirmation email sent." };
    } else return { error: "Could not send email. Try logging in later." };
  }
  
if(existingUser.twoFactorEnabled && existingUser.email){
  if(code){
    //Verify token
    const existingToken = await getTwoFactorTokenByEmail(existingUser.email)
    if(existingToken){
      if(!existingToken || existingToken.token !== code) return {error : "Invalid code"}
      if(new Date(existingToken.expires) < new Date()) return {error : "Token expired"}
      if(existingToken.token === code){
        await db.twoFactorToken.delete({
          where : {id : existingToken.id}
        })
        const existingTwoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
        if(existingTwoFactorConfirmation){
          await db.twoFactorConfirmation.delete({
            where: {id : existingTwoFactorConfirmation.id}
          })
        }
        await db.twoFactorConfirmation.create({
          data : {
            userId : existingUser.id
          }
        })
      }
    }else{
      return {error : "Invalid code"}
    }

  }else {
    const twoFactorToken = await generateTwoFactorToken(email)
    await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token)
    return {twoFactor : true}
  }
  
}

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: defaultLoginRedirect,
    });
    return { success: "Logged in successfully!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };

        default:
          return { error: "An error occured" };
      }
    }
    throw error;
  }
}
