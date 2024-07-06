"use client";
import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { SetNewPasswordSchema } from "@/schemas";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useCallback, useState, useTransition, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { setNewPassword } from "@/actions/set-new-password";
import { error } from "console";
import { Input } from "../ui/input";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Button } from "../ui/button";

export default function SetNewPasswordForm() {
  const [formSuccess, setFormSuccess] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setFormError("Broken link");
    }
  }, [token]);

  const form = useForm<z.infer<typeof SetNewPasswordSchema>>({
    resolver: zodResolver(SetNewPasswordSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
      token : token || undefined
    },
  });

  const handleSubmit = (values: z.infer<typeof SetNewPasswordSchema>) => {
    setFormError("");
    setFormSuccess("");
    startTransition(async () => {
      const data = await setNewPassword(values);
      if (data.error) setFormError(data.error);
      if (data.success) setFormSuccess(data.success);
    });
  };

  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      headerLabel="Create new password"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className=" space-y-6">
          <div className="flex flex-col space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="Enter your new password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }}
            />
            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => {
                return <FormItem>
                  <FormLabel>Repeat Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="Repeat your new password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }}
            />
          </div>
          <Button type="submit" className="w-full my-2" disabled={isPending}>
            Submit
          </Button>
          <FormSuccess message={formSuccess} />
          {!formSuccess && <FormError message={formError} />}
        </form>
      </Form>
    </CardWrapper>
  );
}
