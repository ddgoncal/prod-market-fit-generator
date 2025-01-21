"use client"

import { signIn } from "next-auth/react"

export default function SignIn() {
  return <><h1>asda</h1><button onClick={() => signIn("google")}> tas</button></>
}