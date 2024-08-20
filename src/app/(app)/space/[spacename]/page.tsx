'use client'

import { Separator } from '@/components/ui/separator';
import { useAppSelector } from '@/redux/hooks';
import { getSpaces } from '@/redux/spaceslice';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React, { useEffect, useState } from 'react';
import { Message } from '@/schemas/Message';
import { Space } from '@/schemas/Space';
import SpaceHeader from '@/components/SpaceHeader';
import { Button } from '@/components/ui/button';
import EditSpace from '@/components/space/EditSpace';
import MessageComponent from '@/components/MessageComponent';
import axios from 'axios';
import Sidebar from '@/components/space/sidebar';
import EmbedToSite from '@/components/space/EmbedToSite';

const Page = () => {
    const spaces = useAppSelector(getSpaces);
    const params = useParams();
    const [space, setSpace] = useState<Space | undefined>(undefined);
    const [editSpace, setEditSpace] = useState(false);
    const [stateLoading, setStateLoading] = useState(true);
    const [messageLoading, setMessageLoading] = useState(false);
    const [sideBarOption, setSideBarOption] = useState('All');
    const [messages, setMessages] = useState<Message[]>([]);
    const [likeMessage, setLikeMessage] = useState<boolean>(false);

    useEffect(() => {
        if (spaces && spaces.length > 0) {
            const foundSpace = spaces.find((space: Space) => space?.name === params.spacename);
            setSpace(foundSpace);
            setStateLoading(false);
        }
    }, [spaces, params.spacename]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (space && !stateLoading) {
                try {
                    setMessageLoading(true);
                    let endpoint = '/api/get-messages/';
                    if (sideBarOption === 'Liked') {
                        endpoint = '/api/get-likedMessages/';
                    }

                    const response = await axios.get(`${endpoint}${space.name}`);
                    console.log(response?.data.messages);
                    setMessages(response?.data.messages);
                } catch (error) {
                    console.log('Error fetching messages:', error);
                } finally {
                    setMessageLoading(false);
                }
            }
        };

        fetchMessages();
    }, [space, stateLoading, sideBarOption, likeMessage]);

    if (stateLoading) {
        return <div className='w-full text-center my-12'>Loading...</div>;
    }

    if (!space) {
        return <div className='w-full text-center my-12'>No space found</div>;
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
                            <SpaceHeader space={space} h={'h-24'} w={'w-24'} bg={'background'} p={'py-1'} />
                            <div className='flex w-full justify-end'>
                                <Button className='flex items-center gap-3' onClick={() => setEditSpace(true)}>
                                    Edit Space
                                </Button>
                            </div>
                        </>
                    )}
                    <Separator className='mt-4' />

                    <div className='w-full h-[60vh] flex'>
                        <Sidebar setSideBarOption={setSideBarOption} />

                        <div className='w-[80%]'>
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
                                        Nothing to see here
                                    </p>
                                </div>
                            ) : (
                                sideBarOption === 'Embed to your site' ? 
                                <EmbedToSite spaceId={space._id} />:
                                <>
                                    <div className='p-4 w-full flex items-center justify-end'>
                                        <h4 className='text-left'>{messages.length} Messages</h4>
                                    </div>
                                    <ScrollArea className='h-[62vh] w-full rounded-md px-12 py-4'>
                                        {messages.map((message: Message) => (
                                            <MessageComponent 
                                                message={message} 
                                                key={message._id}  
                                                setLikeMessage={setLikeMessage} 
                                                likeMessage={likeMessage}
                                            />
                                        ))}
                                    </ScrollArea>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;
