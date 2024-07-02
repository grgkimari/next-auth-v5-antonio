"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { defaultLoginRedirect } from "@/routes";
import { LoginSchema } from "@/schemas";
import { error } from "console";
import { AuthError } from "next-auth";

import * as z from "zod";

export default async function Login(values: z.infer<typeof LoginSchema>) {
  console.log(`Login server action called.`);
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid input detected" };
  }
  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email)

  if(!existingUser || !existingUser.email || !existingUser.password){
    return {error : "Email not found."}
  }
  if(!existingUser.emailVerified){
    const newVerificationToken = await generateVerificationToken(existingUser.email)
    if(newVerificationToken) {
      await sendVerificationEmail(email, newVerificationToken?.token)
    return {success : "Confirmation email sent."}}
    else return {error : "Could not send email. Try logging in later."}
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
