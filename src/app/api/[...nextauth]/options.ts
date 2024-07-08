import type { NextAuthOptions, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const baseURL = `${process.env.NEXT_PUBLIC_HOSTNAME}/api/login`;

// Define a type guard function to check if an object is a valid user
function isValidUser(user: unknown): user is User {
  return (
    typeof user === "object" &&
    user !== null &&
    "name" in user &&
    "email" in user &&
    "image" in user
  );
}

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const requestBody = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch(baseURL, {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" },
        });

        const resdata = await res.json();

        if (resdata.success) {
          return resdata.data;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
    signOut: "/auth/signout",
  },
  callbacks: {
    async session({ session, token }) {
      if (isValidUser(token.user)) {
        session.user = token.user;
      }
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
};
