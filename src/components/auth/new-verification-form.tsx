"use client"
import { PulseLoader } from "react-spinners";
import CardWrapper from "./card-wrapper";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { verifyEmail } from "@/actions/new-verification";
import FormSuccess from "../form-success";
import FormError from "../form-error";



export default function NewVerificationForm(){
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const [success, setSuccess] = useState<string>("")
    const [error, setError] = useState<string>("")
    const onSubmit = useCallback(async () => {
        if(token){
            const result = await verifyEmail(token)
            if(result.success) setSuccess(result.success)
            else if(result.error) setError(result.error)
        }
        else setError("Broken link")
    }, [token])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])
    return <CardWrapper headerLabel="Email verification" backButtonHref="/auth/login" backButtonLabel="Back to Login">
        <div className="w-full flex justify-center items-center min-h-12">
            <FormSuccess message={success} />
            {!success && <FormError message={error} />}
            </div>
    </CardWrapper>
}