import { Space } from '@/schemas/Space'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

const Popup = ({ spaceData }: { spaceData: Space }) => {
  return (
    <div className='p-4 text-center bg-neutral-700 flex flex-col gap-2 items-center justify-center rounded-lg'>
<Image src={spaceData?.sticker} alt='img' height={300} width={300} className='rounded-lg'/>
<h2 className='text-xl font-semibold'>{spaceData?.thankyouPageTitle}</h2>
<p>{spaceData?.thankyouPageText}</p>
<Button className='w-full'>Close</Button>
    </div>
  )
}

export default Popup