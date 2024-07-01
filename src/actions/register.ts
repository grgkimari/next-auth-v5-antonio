"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from 'bcrypt'
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export default async function Register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid input detected" };

  const {email, password, name} = validatedFields.data
  const existingUser = await getUserByEmail(email)
  if(existingUser) return {error : "Email already in use"}
  const hashedPassword = await bcrypt.hash(password,12)

  await db.user.create({
    data : {
      name,
      email,
      password  : hashedPassword
    }
  })

  async function main(){
    const users = await db.user.count()
    console.log(`Users : ${users}`)
}

main()
  //Send verification token to user

  

  return { success: "Registered" };
}
