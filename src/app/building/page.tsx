import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-6 items-center justify-center h-screen w-screen'>
     <p className='font-semibold text-3xl'>The app is in progress...🔨</p> 
     <Button><Link href={'/dashboard'}>Back to home</Link> </Button>
    </div>
  )
}

export default page
