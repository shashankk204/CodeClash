"use server"
import { signIn } from "@/lib/auth";
import { LoginValues } from "@/lib/zod"
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
export default async function HandleLogin(values:LoginValues)
{
    

    
    try {
        await signIn("credentials",{username:values.username,password:values.password,redirectTo:'/'})
        // throw Error("some blah blah")
    } catch (error) {
        if(isRedirectError(error)) throw error

        if(error instanceof AuthError) return {error:error.cause?.err?.message}
        
        return {error:(error as Error).message}
    }

    // redirect("/");
        
}