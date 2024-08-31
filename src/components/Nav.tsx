'use client'
import React from 'react'
import Link from 'next/link'
import { Dropdown } from './Dropdown'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const Nav = () => {
    return (
        <nav className='flex items-center justify-between py-6'>
            <h1 className='font-bold text-3xl'><Link href={'/'}>Feedback</Link></h1>
   <Dropdown/>
        </nav>
    )
}

export default Nav
