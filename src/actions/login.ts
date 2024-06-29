"use server";

import { LoginSchema } from "@/schemas";
import { error } from "console";
import * as z from "zod";

export default async function Login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values)
  if(!validatedFields.success) return {error : "Invalid input detected"}
  
  return {success : "Logged in"}
}
