import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import { compareSync } from "bcrypt-ts-edge";

export const config = {
  debug: true,
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;
        // Find user in the database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        // Check if user exists & password is correct
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );

          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }: any) {
      // Set the user ID from the token
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;
      // If there is an update, set the user name
      if (trigger === "update") {
        session.user.name = user.name;
      }
      return session;
    },
    async jwt({ token, user }: any) {
      // Assign user fields to the token
      if (user) {
        token.role = user.role;
        // If user has no name, set it to the first part of the email
        if (user.name === "NO_NAME") {
          token.name = user.email.split("@")[0];
          // Update database to reflect token name
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }
      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
