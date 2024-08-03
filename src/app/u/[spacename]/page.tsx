import Main from '@/components/SendMessage/Main'
import { dbConnect } from '@/lib/dbConnect'
import SpaceModel from '@/models/spaceModel'
import { Space } from '@/schemas/Space'
import React from 'react'

const SpacePage = async ({ params }: { params: { spacename: string } }) => {
  await dbConnect()
  
  const space: Space | null = await SpaceModel.findOne({ name: params.spacename }).lean()

  if (!space) {
    return <div className='flex bg-black font-3xl text-white items-center justify-center h-screen w-screen'>Space not found</div>
  }

  return <Main spaceData={space}/>
}

export default SpacePage
