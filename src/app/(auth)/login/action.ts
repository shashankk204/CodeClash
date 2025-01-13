"use server"
import { signIn } from "@/lib/auth";
import { LoginValues } from "@/lib/zod"
import { error } from "console";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
export default async function HandleLogin(values:LoginValues)
{
    

    
    try {
        await signIn("credentials",{username:values.username,password:values.password,redirectTo:'/'})
        // throw Error("some blah blah")
    } catch (error:any) {
        if(isRedirectError(error)) throw error

        if(error instanceof AuthError) return {error:error.cause?.err?.message}
        
        return {error:error.message}
    }

    // redirect("/");
        
}