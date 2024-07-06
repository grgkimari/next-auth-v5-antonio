import NextAuth, { DefaultSession } from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
import email from "next-auth/providers/email"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
 
type ExtendedUser = DefaultSession["user"] & {role : "ADMIN" | "USER"}

declare module "next-auth"{
    interface Session{
        user : ExtendedUser
    }
}
export const { auth, handlers, signIn, signOut } = NextAuth({
  pages : {
    signIn : '/auth/login',
    error : '/auth/error'
  },
  ...authConfig,
  adapter : PrismaAdapter(db),
  session : {
    strategy : "jwt"
  },
  events : {
    async linkAccount({user}){
        await db.user.update({
            where : {
                id : user.id
                
            },
            data : {
                emailVerified : new Date()
            }
        })
    }
  },
  callbacks : {

    async session({token, session, user}){
        
        
        if(session.user && user){
          console.log(`User : ${JSON.stringify(user)}`)
            if(token.sub) {
                session.user.id = token.sub
                session.user.email = user.email
            const existingUser = await getUserById(token.sub)
            if(existingUser) session.user.role = existingUser.role
            }
        }
        return session
    },
    async jwt({token, user}){
        
        return token
    },

    async signIn({user, account}){
      
      if(account?.provider !== "credentials") return true
      const existingUser = await getUserById(user?.id || "")
      if(existingUser?.twoFactorEnabled){
        const existingTwoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
        if(existingTwoFactorConfirmation){
          await db.twoFactorConfirmation.delete({
            where : {id : existingTwoFactorConfirmation.id}
          })
        }
        else{
          return false
        }
      }
      if(!existingUser?.emailVerified) return false

      return true
    }
    
  }
})