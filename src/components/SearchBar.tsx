"use client"
import React from 'react'
import { Input } from './ui/input'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';

function SearchBar() {
    const router = useRouter();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const form = e.currentTarget;
      const q = (form.query as HTMLInputElement).value.trim();
      if (!q) return;
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  return (
      <form onSubmit={handleSubmit} method='GET' action='/search'>
        <div className='relative'>
            <Input name="query" placeholder='search' className='pe-10'/>
            <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground"/>

        </div >
    </form>
  )
}

export default SearchBar
