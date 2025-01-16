"use server"
import prisma from "@/lib/db";
import { SignUpValues } from "@/lib/zod";
import bcrypt from "bcrypt";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

export default async function HandleSignup(value:SignUpValues){


    try {
       const UserExist=await prisma.user.findFirst({
        where:{
            OR:[
                {email:value.email},
                {username:value.username}

            ]
        }})        
        if(UserExist)
        {
            if(UserExist.email===value.email) throw Error("Email alreaedy in use")
            else throw Error("Username Already Taken");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(value.password, salt);
        const newuser=await prisma.user.create({data:{email:value.email,username:value.username,displayname:value.username,passwordHash:hashedPassword}});
        
        await signIn("credentials",{username:newuser.username,password:value.password,redirectTo:'/'})

    } catch (error) {
        if(isRedirectError(error)) throw error
        if(error instanceof AuthError) return {error:error.cause?.err?.message}
        return {error:(error as Error).message}
    }


}