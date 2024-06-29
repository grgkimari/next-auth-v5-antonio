import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <p className="font-semibold text-green-400">Hello Auth!</p>
      <Button size={"lg"} variant={"custom"}>
        Click me!
      </Button>
    </>
  );
}
