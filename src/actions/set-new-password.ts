"use server";
import { db } from "@/lib/db";
import { SetNewPasswordSchema } from "@/schemas";
import { error } from "console";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { getVerificationTokenByToken } from "@/data/verification-token";
export async function setNewPassword(
  values: z.infer<typeof SetNewPasswordSchema>
) {
  try {
    const validatedFields = SetNewPasswordSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid input" };
    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 12);
    const existingToken = await getVerificationTokenByToken(validatedFields.data.token)
    if(!existingToken) return {error : "Unable to verify identity"}
    await db.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        email : existingToken.email
      },
    });
    return { success: "New password set. Proceed to login" };
  } catch (error) {
    console.log(`Error setting password : ${error}`);
    return { error: "An unexpected error occurred" };
  }
}
