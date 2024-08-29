import CodeBlock from '@/components/CodeBlock';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'

const GetApi = ({spacename}:{spacename:string}) => {
    const [messageType, setMessageType] = useState('all');
    const baseUrl = `${window.location.protocol}//${window.location.host}`; 
    const query=messageType=='all' ? 'get-messages' : 'get-likedMessages'
    const url = `${baseUrl}/api/${query}/${spacename}`
    return (
        <div>
            <div className='py-8'>
                <h1 className='text-center font-bold text-4xl mb-4'>Get Api</h1>
                <p className='text-center px-20 text-muted-foreground text-md'>Copy this api and make request to fetch messages</p>
            </div>
           
                <div className='my-12'>
                <div className='flex w-full gap-2 justify-start items-center'>
                    <Badge variant="secondary">Step 1</Badge>
                    <h3 className='font-semibold text-xl'>Select message type</h3>
                </div>
                <div className='flex gap-4 my-4'>
                    <Button onClick={() => setMessageType('all')} className={`px-4 py-2 ${messageType === 'all' ? 'bg-primary' : 'bg-muted '}`}>All</Button>
                    <Button onClick={() => setMessageType('liked')} className={`px-4 py-2 ${messageType === 'liked' ? 'bg-primary ' : 'bg-muted'}`}>Liked</Button>
                </div>

            </div>
            
            <CodeBlock code={url}/>
        </div>
    )
}

export default GetApi
