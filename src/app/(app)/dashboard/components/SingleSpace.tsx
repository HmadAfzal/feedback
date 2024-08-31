import React from 'react';
import {Link2 } from 'lucide-react';
import { Space } from '@/schemas/Space';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SpaceSettings from '@/components/SpaceSettings';



const SingleSpace = ({space}:{space: Space }) => {
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    const spaceUrl = `${baseUrl}/u/${space?.name}`;
    const truncatedUrl = spaceUrl.length > 35 ? `${spaceUrl.slice(0, 35)}...` : spaceUrl;

    return (
        <div className={`dark:bg-neutral-800 bg-neutral-200 md:py-5 py-4 w-full rounded-lg flex items-center md:gap-6 gap-3 md:px-6 px-4 md:my-6 my-4`}>
                <Avatar className={'md:h-16 md:w-16 h-12 w-12'}>
                    <AvatarImage src={space?.image} />
                    <AvatarFallback>{space?.name[0]}</AvatarFallback>
                </Avatar>
                <div className='w-full'>
                    <div className='flex items-center justify-between'>
                    <h3 className='font-bold md:text-xl text-lg md:pb-2 pb-1'>{space?.name}</h3>
                    <SpaceSettings spaceUrl={spaceUrl} space={space}/>
                    </div>
                    <div className='flex items-center gap-2 text-muted-foreground hover:underline [w-98%]'>
                        <Link2 className='md:size-5 size-4' />
                        <span className='block sm:hidden text-xs text-muted-foreground tracking-wide'>{truncatedUrl}</span>
                        <span className='hidden sm:block text-md  text-muted-foreground tracking-wide'>{spaceUrl}</span>
                    </div>
                </div>
            </div>
        
    );
};

export default SingleSpace