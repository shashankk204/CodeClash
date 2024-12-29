"use server"
import { LoginValues } from "@/lib/zod"
import { redirect } from "next/navigation";
export default async function HandleLogin(values:LoginValues)
{
    console.log(values)
    let val=true;
    await new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(true);
        },5000)
    })

    try {
        if(!val)
        {
            return {error:"someting went off"}
        }
        
    } catch (error:any) {
        return {error:error.message}
    }

    redirect("/");
        
}