'use client'

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react';
import CreateSpace from '@/components/dashboard/CreateSpace';
import Dashboard from '@/components/dashboard/Dashboard';
import axios from 'axios';
import { useAppDispatch, } from '@/redux/hooks';
import {  selectSpaces } from '@/redux/spaceslice';
const page = () => {
  const [createSpace, setCreateSpace] = useState(false);
  const { data: session, status } = useSession()
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getSpaces = async () => {
      try {
        const response = await axios.get('/api/get-spaces')
        dispatch(selectSpaces(response?.data.spaces))
      } catch (error) {
        console.log(error)
      }
    }
    getSpaces();
  }, [dispatch, session])


  if (status === 'loading') {
    return (
      <div className='w-full flex items-center justify-center py-40'>
        <Loader2 className='animate-spin w-12 h-12 text-[#EA580C]' />
      </div>

    )
  }
  return (
    <div>
      {createSpace ? <CreateSpace setCreateSpace={setCreateSpace} user={session?.user} /> : <Dashboard user={session?.user} setCreateSpace={setCreateSpace} />}
    </div>
  )
}

export default page
