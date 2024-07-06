"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export default async function Register(values: z.infer<typeof RegisterSchema>) {
  try {
    const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid input detected" };

  const { email, password, name } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: "Email already in use" };
  const hashedPassword = await bcrypt.hash(password, 12);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  //Send verification token to user
  const verificationToken = await generateVerificationToken(email);
  if(verificationToken){
    await sendVerificationEmail(email, verificationToken.token)
  }

  return { success: "Confirmation email sent!" };
  } catch (error) {
    console.log(`Error creating user: ${error}`)
    return {error : "An unexpected error occurred"}
  }
  
}
