import NextAuth, { Profile } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../util/prisma"
import GitHubProvider from "next-auth/providers/github"
import MLHProvider from "./providers/mlh"

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    MLHProvider({
      clientId: process.env.MLH_ID,
      clientSecret: process.env.MLH_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: {
    ...PrismaAdapter(prisma),
    linkAccount: ({ created_at, ...data }) => prisma.account.create({ data }),
  },
  callbacks: {
    async session({ session, user }) {
      session.user = user
      return session
    },
  },
}

const authHandler = (req, res) => NextAuth(req, res, options)
export default authHandler
