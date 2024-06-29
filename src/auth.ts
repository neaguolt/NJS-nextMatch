
import NextAuth from "next-auth"
import authConfig from "./auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"

//we are in dev env so this will create multiple instances of conections
//const prisma = new PrismaClient()

export const { handlers, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
})