'use client'

import { useSession } from 'next-auth/react';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getFirstName } from '@/utils/getfirstname';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';

const page = () => {

  const { data: session, status } = useSession()

  const username = session?.user.username || '';
if(status==='loading'){
  return (
    <div className='w-full flex items-center justify-center py-40'>
       <Loader2 className='animate-spin w-12 h-12 text-[#EA580C]'/>
    </div>
    
  )
}
  return (
    <div>
      <div className='flex items-center justify-start gap-5 mt-32'>
<Avatar className='h-32 w-32'>
  <AvatarImage src={session?.user.profilepic} />
  <AvatarFallback>img</AvatarFallback>
</Avatar>
<div className='flex flex-col gap-2'>
  <h1 className='font-bold text-5xl'> {getFirstName(username)}&apos;s Dashboard</h1>
  <p className='font-normail text-lg'>{session?.user.email}</p>
</div>
</div>
<Separator className="my-12" />
    </div>
  )
}

export default page
