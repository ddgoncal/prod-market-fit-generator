import { authConfig } from "auth.config";
import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [Google, GitHub, Credentials({})],
})