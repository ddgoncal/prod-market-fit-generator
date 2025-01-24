import type { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
 
export const authConfig = {
  pages: {
    signIn: '/auth/login',
    error: '/auth/error', // Error code passed in query string as ?error=
    signOut: '/auth/signup',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  },
  providers: [GitHub, Google], // We'll configure these in auth.ts
} satisfies NextAuthConfig;