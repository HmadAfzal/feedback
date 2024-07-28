'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/Modetoggle'
import { signOut } from 'next-auth/react'

const Nav = () => {
    const handleSignout = async () => {
        await signOut();
    };
    return (
        <nav className='flex items-center justify-between py-6'>
            <h1 className='font-bold text-3xl'>Feedback</h1>
            <div className='flex items-center justify-center gap-8'>
                <ModeToggle />
                <Button onClick={handleSignout}>Sign out</Button>
            </div>
        </nav>
    )
}

export default Nav
