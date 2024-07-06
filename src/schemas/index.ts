import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password is required",
  }),
  code : z.optional(z.string())
});
export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Minimun 6 characters",
  }),
  name: z.string().min(2, { message: "Minimum 2 characters" }),
});

  export const passwordResetRequestSchema = z.object({
    email: z.string().email()
})

export const SetNewPasswordSchema = z.object({
  password : z.string().min(6),
  repeatPassword : z.string().min(6),
  token : z.string().min(6)
})
