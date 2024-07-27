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
        <div className='flex  gap-4'><div className='cursor-pointer'><FaDiscord size={20}/></div> <div className='cursor-pointer'><FaInstagram size={20}/></div></div>
        </div>
      <Image src="/authimg.jpeg" alt='authimg' height={400} width={400} className='rounded-xl'/>
      <Button className='w-full flex items-center justify-center gap-2'><FaGithub size={20}/>Sign up with GitHub</Button>
      <Button className='w-full flex items-center justify-center gap-2'><FaGoogle size={18}/>Sign up with Google</Button>
<p className='text-sm font-light'>Already have an account? <Link href={'/login'} className='underline'>Login</Link></p>
          </div>
  )
}

export default page
