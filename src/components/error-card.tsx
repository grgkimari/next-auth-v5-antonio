import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import BackButton from "./auth/back-button";
import CardWrapper from "./auth/card-wrapper";
import Header from "./auth/header";
import { Card, CardFooter, CardHeader } from "./ui/card";

export default function ErrorCard(){
    return <CardWrapper headerLabel="Oops! Something went wrong." backButtonLabel="Back to Login" backButtonHref="/auth/login" >
        <div className="w-full flex justify-center"><ExclamationTriangleIcon className="text-destructive" /></div>
    </CardWrapper>
}