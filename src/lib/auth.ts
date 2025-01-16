import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import prisma from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username:", type: "username" },
        password: { label: "Password:", type: "password" },
      },
      authorize: async ({ username, password }) => {
        if (!username || !password) return null;
        const user = await prisma.user.findFirst({
          where: {
            username
          }
        })
        if(!user) throw Error("user does not exists");
        
        // @ts-ignore
        const bool=await bcrypt.compare(password,user.passwordHash)
        if(!bool) throw Error("Wrong password");          
        
        
        
        return {id:user.id,name:user.username,email:user.email}
      },


    })
  ],


  callbacks: {
    

    session({ session, token }) {

      if (token.sub) 
        {
          session.userId = token.sub
          session.user.id=token.sub
        }
          return session
    },
    

  },
  pages: {
    signIn:'/login'

  },


})