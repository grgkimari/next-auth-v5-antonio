"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa6";
import { signIn } from "next-auth/react";
import { defaultLoginRedirect } from "@/routes";

export default function Social() {
  async function clickHandler (provider : "google" | "github"){
    signIn(provider, {
      callbackUrl : defaultLoginRedirect
    })
  }
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => {clickHandler("google")}}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => {clickHandler("github")}}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
}
