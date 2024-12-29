import React from 'react'
import LoginImage from "@/assets/login.jpg"
import Image from 'next/image'
import Link from 'next/link'
function Login() {
  return (
    <div className='w-screen h-screen flex justify-center items-center p-10'>
      <div className='flex  w-full h-full max-w-[64rem] max-h-[40rem] rounded-2xl bg-card shadow-2xl overflow-hidden'>
        <div className='md:w-1/2 flex flex-col items-center w-full'>
          <div className='pt-10 text-3xl font-extrabold bg-slate-400'>Login in to CodeClash</div>
          <div>form</div>
          <div>Don't have Account? <span className='hover:underline'><Link href={'/signup'}>Signup</Link></span></div>
        </div>

        <div className='hidden md:w-1/2 md:block  '>
          <Image className="object-cover w-full h-full" src={LoginImage} alt='Empty'></Image>
        </div>
      </div>
      
    </div>
  )
}

export default Login
