import NextAuth, { DefaultSession } from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
 
type ExtendedUser = DefaultSession["user"] & {role : "ADMIN" | "USER"}

declare module "next-auth"{
    interface Session{
        user : ExtendedUser
    }
}
export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter : PrismaAdapter(db),
  session : {
    strategy : "jwt"
  },
  callbacks : {

    async session({token, session}){
        
        
        if(session.user){
            if(token.sub) {
                session.user.id = token.sub
            const user = await getUserById(token.sub)
            if(user) session.user.role = user.role
            }
        }
        return session
    },
    async jwt({token, user}){
        
        return token
    }
  }
})