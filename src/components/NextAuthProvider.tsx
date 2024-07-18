"use client";

import { SessionProvider } from "next-auth/react";

interface NextAuthProviderProps {
  children: React.ReactNode;
  session: any;
}

const NextAuthProvider = ({ children, session }: NextAuthProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default NextAuthProvider;
