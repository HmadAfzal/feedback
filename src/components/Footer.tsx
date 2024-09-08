'use client'
import React from 'react'
import ThemeToggle from './ThemeToggle'
import { Separator } from './ui/separator'
import { GitHubLogoIcon, InstagramLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

const SocialLinks = () => (
  <div className='flex items-center gap-6'>
    <a href="https://github.com" aria-label="GitHub">
      <GitHubLogoIcon className='w-4 h-4 cursor-pointer hover:text-primary-foreground transition-colors duration-200' />
    </a>
    <a href="https://twitter.com" aria-label="Twitter">
      <TwitterLogoIcon className='w-4 h-4 cursor-pointer hover:text-primary-foreground transition-colors duration-200' />
    </a>
    <a href="https://instagram.com" aria-label="Instagram">
      <InstagramLogoIcon className='w-4 h-4 cursor-pointer hover:text-primary-foreground transition-colors duration-200' />
    </a>
  </div>
)

const NavLinks = ({ links }:{links:any}) => (
  <nav className='flex lg:flex-row flex-col lg:gap-16 gap-4'>
    {links.map(({ href, label }:{ href:any, label:any }) => (
      <Link key={href} href={href} className='hover:text-primary-foreground transition-colors duration-200'>
        {label}
      </Link>
    ))}
  </nav>
)

const Footer = () => {
  const leftLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/create-space', label: 'Create Space' },
    { href: '/contact', label: 'Contact Us' },
    
  ]
  
  const rightLinks = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/docs', label: 'Documentation' },
    { href: '/help', label: 'Help' },
    { href: '/terms', label: 'Terms of Service' }
  ]

  return (
    <div className='my-12'>
      <Separator className='my-4' />
      <div className='pt-10 md:px-10 px-2'>
        <div className='w-full flex items-center justify-between mb-12'>
          <h1 className='font-bold text-3xl'>Feedback</h1>
          <ThemeToggle />
        </div>
        <div className='text-muted-foreground text-sm flex flex-row justify-between gap-8'>
          <div className='flex flex-col lg:flex-row lg:gap-16 gap-8 lg:items-center items:start'>
            <SocialLinks />
            <NavLinks links={leftLinks} />
          </div>
          <NavLinks links={rightLinks}/>
        </div>
      </div>
    </div>
  )
}

export default Footer
