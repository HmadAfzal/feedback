import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaGoogle, FaGithub, FaDiscord } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";


const page = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 h-screen'>
      <div className='flex items-center justify-between px-4 w-full'>
        <h1 className='font-bold text-3xl'>Feedback</h1> 
        <div className='flex  gap-4'><div className='cursor-pointer'><FaDiscord size={18}/></div> <div className='cursor-pointer'><FaInstagram size={18}/></div></div>
        </div>
      <Image src="/loginimg.jpeg" alt='loginimg' height={400} width={400} className='rounded-xl'/>
      <Button className='w-full flex items-center justify-center gap-2'><FaGithub size={20}/>Continue with GitHub</Button>
      <Button className='w-full flex items-center justify-center gap-2'><FaGoogle size={18}/>Continue with Google</Button>
<p className='text-sm font-light'>Don&apos;t have an account? <Link href={'/sign-up'} className='underline'>Login</Link></p>
          </div>
  )
}

export default page
