import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }: any) {
      const userExists = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

      if (userExists) {
        session.user = {
          ...session.user,
          id: userExists.id,
          name: userExists.name,
          email: userExists.email,
          image: userExists.image,
          role: userExists.role,
        };
      }

      return session;
    },
    async signIn({ user, account, profile }: any) {
      const { email, name, image } = user;

      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        // User exists, link the OAuth account to the existing user
        await prisma.account.upsert({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId.toString(),
            },
          },
          update: {},
          create: {
            userId: existingUser.id,
            provider: account.provider,
            providerAccountId: account.providerAccountId.toString(),
            type: account.type,
            access_token: account.access_token,
            expires_at: account.expires_at,
            id_token: account.id_token,
            refresh_token: account.refresh_token,
            scope: account.scope,
            token_type: account.token_type,
          },
        });

        return true;
      } else {
        // User does not exist, create a new user
        await prisma.user.create({
          data: {
            email,
            name,
            image,
            role: email === process.env.DEV_EMAIL ? "DEV" : "USER",
            accounts: {
              create: {
                provider: account.provider,
                providerAccountId: account.providerAccountId.toString(),
                type: account.type,
                access_token: account.access_token,
                expires_at: account.expires_at,
                id_token: account.id_token,
                refresh_token: account.refresh_token,
                scope: account.scope,
                token_type: account.token_type,
              },
            },
          },
        });

        return true;
      }
    },
    async jwt({ token, user, account }: any) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.role = user.role;
      }

      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
  },
};
