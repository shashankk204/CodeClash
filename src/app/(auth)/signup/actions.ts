"use server"
import { SignUpValues } from "@/lib/zod";
import { redirect } from "next/navigation";


export default async function HandleSignup(vale:SignUpValues){


    try {
        let val=false;
        await new Promise((resolve,reject)=>{setTimeout(() => {
            resolve(true)
        }, 5000);})
        
        if(!val)
        {
            return {error:"something was off"}
        }
        
    } catch (error:any) {
        console.log(error);
        return {error:error.message}
    }
    return redirect("/");


}