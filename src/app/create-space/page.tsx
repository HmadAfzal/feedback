import React, { useState } from 'react'
import Main from './components/Main'
import { Separator } from '@/components/ui/separator'

const page = () => {

  return (

    <div className="space-y-6 p-10 pb-16 ">
    <div className="space-y-0.5">
      <h2 className="text-2xl font-bold tracking-tight">Create space</h2>
      <p className="text-muted-foreground">
        Create a space and set other preferences.
      </p>
    </div>
    <Separator className="my-6" />
<Main/>
  </div>

  )
}

export default page