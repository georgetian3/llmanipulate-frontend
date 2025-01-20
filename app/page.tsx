import type { Metadata } from "next";
import LoginPage from "./login/page";

export default function IndexPage() {
  return <LoginPage />
}

export const metadata: Metadata = {
  title: "LLManipulate",
};
