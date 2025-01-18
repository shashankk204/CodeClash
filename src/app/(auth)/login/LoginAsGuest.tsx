"use client"
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast';
import React, { useState } from 'react'
import HandleLogin from './action';
import { Loader2 } from 'lucide-react';

function LoginAsGuest() {
    const [Loading,SetLoading]=useState<boolean>(false);
    const {toast}=useToast();

    async function handleclick()
    {
        SetLoading(true);
            const error=await HandleLogin({username:"Guest",password:"password"});
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
    <div className='w-full px-9 mb-5'>
      <Button className='w-full ' disabled={Loading} onClick={handleclick} >{Loading?<><Loader2 className='animate-spin'/> Loggin in</>:"Login as Guest"}</Button>
    </div>
  )
}

export default LoginAsGuest
