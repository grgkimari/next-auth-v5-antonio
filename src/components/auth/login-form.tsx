"use client"

import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import * as z from "zod"
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";

export default function LoginForm(){
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver : zodResolver(LoginSchema),
        defaultValues : {
            email : "",
            password : ""
        }
    })
    function handleSubmit(values : z.infer<typeof LoginSchema>){
        console.log(`Values : ${JSON.stringify(values)}`)
    }
    return <CardWrapper backButtonLabel="Don't have an account?" headerLabel="Welcome back" backButtonHref="/auth/register" showSocial >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField control={form.control} name="email" render={({field}) => {
                        return <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="john.doe@example" type="email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }}/>
                    <FormField control={form.control} name="password" render={({field}) => {
                        return <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="password" type="passsword" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }}/>
                </div>
                <Button type="submit" className="w-full">
                    Log in
                </Button>
                <FormSuccess message="Something went right" />
            </form>
        </Form>
    </CardWrapper>
}