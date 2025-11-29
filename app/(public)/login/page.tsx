import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};
import LoginClient from "./LoginClient";

export default function Login() {
  return <LoginClient />;
}
