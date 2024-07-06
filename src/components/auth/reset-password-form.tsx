"use client"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import CardWrapper from "./card-wrapper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { passwordResetRequestSchema } from "@/schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendPasswordResetLink } from "@/actions/send-password-reset-link";
import FormSuccess from "../form-success";
import FormError from "../form-error";


export default function ResetPasswordForm(){
    const form = useForm<z.infer<typeof passwordResetRequestSchema>>({
      resolver : zodResolver(passwordResetRequestSchema),
      defaultValues : {email : ""}
    })
const [isPending, startTransition] = useTransition()
const [error, setError] = useState<string>()
const [success, setSuccess] = useState<string>()

async function handleSubmit(values : z.infer<typeof passwordResetRequestSchema>){
  console.log(`Submitting form`)
  setError("");
    setSuccess("");
  startTransition(
    async() => {
      const result = await SendPasswordResetLink(values.email)
      if(result.success) setSuccess(result.success)
      if(result.error) setError(result.error)
    }
  )
}

    return <CardWrapper headerLabel="Reset password" backButtonHref="/auth/login" backButtonLabel="Back to login">
<Form {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)} >
        <div className="flex flex-col gap-3">
    <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="Enter your email address"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
            Send reset link
          </Button></div>
          <FormSuccess message={success} />
          {!success && <FormError message={error} />}
    </form>
</Form>
    </CardWrapper>
}