import React, { useState } from 'react'
import CreateSpaceForm from './CreateSpaceForm'
import FormPreview from './FormPreview'
import { Session } from '@/schemas/Session'


const CreateSpace = ({ user, setCreateSpace }: { user: Session, setCreateSpace: (value: boolean) => void }) => {
        return (
        <div className='flex w-full py-14 gap-32'>
 
 <CreateSpaceForm setCreateSpace={setCreateSpace} user={user}  />
    <FormPreview  />


        </div>
    )
}

export default CreateSpace
