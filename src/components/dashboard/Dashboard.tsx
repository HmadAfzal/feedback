'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getFirstName } from '@/utils/getfirstname';
import { Separator } from '@/components/ui/separator';
import {Rocket } from 'lucide-react';
import { Session } from '@/schemas/Session';
import { Button } from '../ui/button';
import Nav from '../nav/Nav';

const Dashboard = ({ user, setCreateSpace }: { user: Session, setCreateSpace: (value: boolean) => void }) => {
  return (
    <div>
      <Nav/>
        <div className='flex items-center justify-start gap-5 mt-28'>
          <Avatar className='h-32 w-32'>
            <AvatarImage src={user?.profilepic} />
            <AvatarFallback>pf</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-2'>
            <h1 className='font-bold text-5xl'> {getFirstName(user?.username || '')}&apos;s Dashboard</h1>
            <p className='font-normail text-lg'>{user?.email}</p>
          </div>
        </div>
      <Separator className="my-12" />
      <div className='w-full flex items-center justify-end'><Button className='flex items-center justify-between gap-3' onClick={()=>setCreateSpace(true)}> <Rocket size={20}/> Create Space</Button></div>
    </div>

  )
}

export default Dashboard
