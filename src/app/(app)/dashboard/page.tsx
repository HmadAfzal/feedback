'use client'
import { Button } from '@/components/ui/button'
import { getToken } from 'next-auth/jwt'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const page = () => {

  const handleSignout = async () => {
    await signOut();
  };
  const session=useSession();
  console.log(session.data)
  return (
    <div>
     <Button onClick={handleSignout}>Sign out</Button>
    </div>
  )
}

export default page
