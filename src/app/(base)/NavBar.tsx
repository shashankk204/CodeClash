import SearchBar from '@/components/SearchBar'
import UserButton from '@/components/UserButton'
import Link from 'next/link'
import React from 'react'

function NavBar() {
  return (
    <header className='w-screen bg-card shadow-sm  sticky top-0 z-10'>
       <div className='max-w-[88rem] mx-auto flex items-center justify-center flex-wrap gap-5 px-5 py-3'>
            <Link href={'/'} className='text-primary font-bold text-2xl'>CodeClash</Link>
            <div><SearchBar></SearchBar></div>
            <div className='sm:ms-auto '>
                <UserButton></UserButton>
            </div>
        </div> 
    </header>
  )
}

export default NavBar
