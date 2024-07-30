'use client'

import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { Loader2 } from 'lucide-react';
import CreateSpace from '@/components/dashboard/CreateSpace';
import Dashboard from '@/components/dashboard/Dashboard';

const page = () => {
  const [createSpace, setCreateSpace] = useState(false);

  const { data: session, status } = useSession()
if(status==='loading'){
  return (
    <div className='w-full flex items-center justify-center py-40'>
       <Loader2 className='animate-spin w-12 h-12 text-[#EA580C]'/>
    </div>
    
  )
}
  return (
    <div>
      
    {createSpace ? <CreateSpace setCreateSpace={setCreateSpace}/> : <Dashboard user={session?.user} setCreateSpace={setCreateSpace}/> }
    </div>
  )
}

export default page
