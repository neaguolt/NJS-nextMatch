
import NextAuth from "next-auth"
import authConfig from "./auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"

//we are in dev env so this will create multiple instances of conections
//const prisma = new PrismaClient() so we import prisma from lib/prisma

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
})