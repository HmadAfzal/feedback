'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/Modetoggle'
import { signOut } from 'next-auth/react'
import { useAppDispatch } from '@/redux/hooks'
import { clearSpaceSlice } from '@/redux/spaceslice'
import Link from 'next/link'
import { Dropdown } from './Dropdown'

const Nav = () => {
    const dispatch = useAppDispatch();

    const handleSignout = async () => {
         dispatch(clearSpaceSlice())
         await signOut();
       
    };
    return (
        <nav className='flex items-center justify-between py-6'>
            <h1 className='font-bold text-3xl'><Link href={'/'}>Feedback</Link></h1>
   <Dropdown/>
        </nav>
    )
}

export default Nav
