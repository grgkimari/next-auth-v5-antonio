"use client";
import { useRouter } from "next/navigation";
interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export default function LoginButton({
  children,
  asChild,
  mode,
}: LoginButtonProps) {
  const router = useRouter();
  function clickHandler() {
    router.push('/auth/login')
  }

  return (
    <span onClick={clickHandler} className="cursor-pointer">
      {children}
    </span>
  );
}
