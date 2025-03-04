import { Logo } from "@/components/icons";
import type { Metadata } from "next";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Logo size={96} />
      <p className="font-bold text-4xl">LLManipulate</p>
    </div>
  )
}

export const metadata: Metadata = {
  title: "LLManipulate",
};
