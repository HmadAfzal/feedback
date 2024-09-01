'use client'
import React from 'react'
import ThemeToggle from './ThemeToggle'
import { Separator } from './ui/separator'
import { GitHubLogoIcon, InstagramLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { X } from 'lucide-react'

const Footer = () => {
  return (
    <div className='my-12'>
    <Separator className='my-4'/>
    <div className='pt-10 md:px-16 px-2'>
      <div className='w-full flex items-center justify-between mb-12'>
        <h1 className='font-bold text-3xl'>Feedback</h1> 
        <ThemeToggle/>
      </div>
      <div className=' text-muted-foreground text-sm flex items-center justify-between '> 
        <div className='flex lg:flex-row flex-col lg:gap-16 gap-8 items-center'>
        <div className='flex items-center gap-8'> 
            <GitHubLogoIcon className='size-4 cursor-pointer hover:text-primary-foreground'/> 
            <TwitterLogoIcon className='size-4 cursor-pointer hover:text-primary-foreground'/>
            <InstagramLogoIcon className='size-4 cursor-pointer hover:text-primary-foreground'/>
        </div>
        <div className='flex lg:flex-row flex-col lg:items-center items-start lg:gap-16 gap-2 justify-between'>
        <Link className='hover:text-primary-foreground' href={'/'}>Home</Link>
        <Link className='hover:text-primary-foreground' href={'/create-space'}>Create Space</Link>
        <Link className='hover:text-primary-foreground' href={'/contact'}>Contact Us</Link>
        <Link className='hover:text-primary-foreground' href={'/terms'}>Terms of Service</Link>
        </div>

</div>
        <div className='flex lg:flex-row flex-col lg:items-center items-start lg:gap-16 gap-2 justify-between'>
        <Link className='hover:text-primary-foreground' href={'/privacy'}>Privacy Policy</Link>
        <Link className='hover:text-primary-foreground' href={'/docs'}>Documentation</Link>
        <Link className='hover:text-primary-foreground' href={'/pricing'}>Pricing</Link>
        <Link className='hover:text-primary-foreground' href={'/help'}>Help</Link>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Footer