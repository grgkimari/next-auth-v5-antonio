import CardWrapper from "./card-wrapper";

export default function LoginForm(){
    return <CardWrapper backButtonLabel="Don't have an account?" headerLabel="Welcome back" backButtonHref="/auth/register" showSocial >Login Form</CardWrapper>
}