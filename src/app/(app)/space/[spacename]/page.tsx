'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getSpaces } from '@/redux/spaceslice'
import { Heart, Link2, Loader2, Pen, Settings } from 'lucide-react'
import { useParams } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React, { useEffect, useState } from 'react'
import { Message } from '@/schemas/Message'
import { Space } from '@/schemas/Space'
import SpaceHeader from '@/components/SpaceHeader'
import { Button } from '@/components/ui/button'
import EditSpace from '@/components/space/EditSpace'
import MessageComponent from '@/components/MessageComponent'
import axios from 'axios'
import { getMessages, selectMessages } from '@/redux/messageslice'
import Sidebar from '@/components/space/sidebar'

const Page = () => {
    const spaces = useAppSelector(getSpaces)
    const params = useParams()
    const [space, setSpace] = useState<Space | undefined>(undefined)
    const [editSpace, setEditSpace] = useState(false)
    const [stateLoading, setStateLoading] = useState(true)
    const [messageLoading, setMessageLoading] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (spaces && spaces.length > 0) {
            const foundSpace = spaces.find((space: Space) => space?.name === params.spacename)
            setSpace(foundSpace)
            setStateLoading(false)
        }
    }, [spaces, params.spacename])

    useEffect(() => {
        if (space && !stateLoading) {
            const getMessages = async () => {
                try {
                    setMessageLoading(true)
                    const response = await axios.get(`/api/get-messages/${space.name}`)
                    dispatch(selectMessages(response?.data.messages))
                } catch (error) {
                    console.log('Error fetching messages:', error)
                } finally {
                    setMessageLoading(false)
                }
            }
            getMessages()
        }
    }, [space, stateLoading, dispatch])

    const messages = useAppSelector(getMessages)

    if (stateLoading) {
        return <div className='w-full text-center my-12'>Loading...</div>
    }

    if (!space) {
        return <div className='w-full text-center my-12'>No space found</div>
    }

    return (
        <>
            {editSpace ? (
                <EditSpace setEditSpace={setEditSpace} space={space} />
            ) : (
                <div>
                    <Separator className='my-4' />
                    {space && (
                        <>
                            <SpaceHeader space={space} h={'24'} w={'24'} bg={'background'} p={'py-1'} />
                            <div className='flex w-full justify-end'>
                                <Button className='flex items-center gap-3' onClick={() => setEditSpace(true)}>
                                    <Pen size={20} /> Edit Space
                                </Button>
                            </div>
                        </>
                    )}
                    <Separator className='mt-4' />
                    {messageLoading ? (
                        <div className='w-full flex items-center justify-center py-40'>
                            <Loader2 className='animate-spin w-12 h-12 text-[#EA580C]' />
                        </div>
                    ) : messages && messages.length === 0 ? (
                        <div className='h-[40vh] my-20'>
                            <DotLottieReact
                                src='https://lottie.host/87e53e15-91fb-4670-b307-5eeccaf4a8e9/q1dZxDTPew.json'
                                loop
                                autoplay
                            />
                            <p className='text-center text-lg font-semibold text-neutral-800 dark:text-neutral-500'>
                                No feedbacks yet
                            </p>
                        </div>
                    ) : (
                        <div className='w-full h-[60vh] flex'>
<Sidebar/>
<div className='w-[80%]'>
                                <div className='p-4 w-full flex items-center justify-end'>
                                    <h4 className='text-left'>{messages && messages.length} Messages</h4>
                                </div>
                                <ScrollArea className='h-[62vh] w-full rounded-md px-12 py-4'>
                                    {messages &&
                                        messages.map((message: Message) => (
                                            <MessageComponent message={message} key={message._id} />
                                        ))}
                                </ScrollArea>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default Page
