import React from 'react'
import SignupImage from "@/assets/signup.jpg"
import Image from 'next/image'
import Link from 'next/link'
import SignupForm from './SignupForm'
function Signup() {
  return (
    <div className='flex justify-center items-center h-screen p-10'>

      <div className='flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl'>
        <div className='flex flex-col items-center  w-full md:w-1/2 '>


                <div className='text-3xl pt-10 font-extrabold'> Sign up to CodeClash</div>
                <div className='pt-2 text-slate-400'> A place to find fellow devs </div>
                <div className=' w-full px-9 py-5'><SignupForm /></div>
                <div className='py-5'>Already have an account? <Link href={"/login"} className='hover:underline'>Login</Link></div>

        </div>

        
        <Image src={SignupImage} alt='empty' className='w-1/2 hidden md:block h-full object-cover' /> 
      </div>

    </div>
  )
}

export default Signup
