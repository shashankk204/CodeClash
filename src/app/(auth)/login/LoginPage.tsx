"use client"
import React, { useState } from 'react'
import { loginSchema ,LoginValues} from '@/lib/zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { PasswordInput } from '@/components/PasswordInput'
import { useToast } from '@/hooks/use-toast'
import HandleLogin from './action'
import { Loader2 } from 'lucide-react'




function LoginPage() {
  const [Loading,SetLoading]=useState<boolean>(false);
  const {toast}=useToast();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password:""
    
    },
  })
  async function onSubmit(values:LoginValues) {
    SetLoading(true);
    const error=await HandleLogin(values);
    if(error)
    {
      toast({
      title:"error",
      description:error.error,
      duration:5000,
      variant:"destructive"
      })
    }
    SetLoading(false);
  }


  return (
    <div>
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
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
                <PasswordInput placeholder="Enter your password" {...field} />
              </FormControl>
               
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={Loading} type="submit" className='w-full'>{Loading?<><Loader2 className='animate-spin'/> Loggin in</>:"Login"}</Button>
      </form>
    </Form>
    </div>
  )
}

export default LoginPage
