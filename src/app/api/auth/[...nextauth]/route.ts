import NextAuth, { SessionStrategy } from "next-auth";

import { authOptions } from "@/lib/AuthOptions";

const handler = NextAuth({
  ...authOptions,
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
