"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";

export default async function Register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid input detected" };

  return { success: "Registered" };
}
