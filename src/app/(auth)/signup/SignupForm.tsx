"use client"
import { signUpSchema, SignUpValues } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { use, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import HandleSignup from './actions'
import { Loader2 } from 'lucide-react'
import { PasswordInput } from '@/components/PasswordInput'




function SignupForm() {
    const { toast } = useToast()
    const [loading,setloading] =useState<boolean>(false);
    const form = useForm<SignUpValues>(
        {
            resolver:zodResolver(signUpSchema),
            defaultValues:{
                email:"",
                password:"",
                username:""

                }
        }
    )

async function onSubmit(values: SignUpValues) {
    setloading(true);
    console.log(values)
    const error=await HandleSignup(values)
    // console.log(error)
    if(error)
    {
        toast({
          title: "Error",
          description: error.error,
          variant:"destructive",
          duration:5000
        })
    } 
    setloading(false);

  }



  return (<>
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="username" placeholder="Enter your username" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
            
        )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' placeholder="Enter your Email Address" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
            
        )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                {/* <Input type='password' placeholder="Enter a 8 digit password" {...field} /> */}
                <PasswordInput placeholder="Password" {...field}/>
              </FormControl>
              
              <FormMessage />
            </FormItem>
            
        )}
        />
        <Button disabled={loading} type="submit" className='w-full'> {(loading)?<><Loader2 className="animate-spin"/><span>Creating Account ..</span></>:"Create Account"}</Button>
      </form>
    </Form>
        </>

  )
}

export default SignupForm
