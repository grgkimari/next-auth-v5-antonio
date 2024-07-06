"use client";

import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import Login from "@/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import BackButton from "./back-button";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use."
      : "";
  const [showTwoFactorCodeInputField, setshowTwoFactorCodeInputField] =
    useState<boolean>(false);
  const [formError, setFormError] = useState<string | undefined>();
  const [formSuccess, setFormSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function handleSubmit(values: z.infer<typeof LoginSchema>) {
    setFormError("");
    setFormSuccess("");
    startTransition(async () => {
      const data = await Login(values);
      if (data.error) {
        form.reset();
        setFormError(data?.error);
      } else if (data.success) {
        form.reset();
        setFormSuccess(data?.success);
      }
      else if(data.twoFactor){
        setshowTwoFactorCodeInputField(true)
      }
    });
  }
  return (
    <CardWrapper
      backButtonLabel="Don't have an account?"
      headerLabel="Welcome back"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            {!showTwoFactorCodeInputField && <><FormField
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
                        placeholder="john.doe@example"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="password"
                        type="passsword"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            /></>}
            {showTwoFactorCodeInputField && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>2FA code</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="2FA code"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )}
          </div>
          <BackButton href="/auth/reset-password" label="Forgot password?" />
          <Button type="submit" className="w-full" disabled={isPending}>
            {showTwoFactorCodeInputField ? "Confirm" : "Log in"}
          </Button>
          <FormSuccess message={formSuccess} />
          <FormError message={formError || urlError} />
        </form>
      </Form>
    </CardWrapper>
  );
}
