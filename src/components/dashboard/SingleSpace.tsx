import React from 'react';
import {Link2 } from 'lucide-react';
import { Space } from '@/schemas/Space';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import SpaceSettings from '../SpaceSettings';


const SingleSpace = ({space}:{space: Space }) => {
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    const spaceUrl = `${baseUrl}/u/${space?.name}`;
    const truncatedUrl = spaceUrl.length > 25 ? `${spaceUrl.slice(0, 25)}...` : spaceUrl;

    return (
        <div className={`dark:bg-neutral-800 bg-neutral-200 py-5 w-full rounded-lg md:px-6 px-4 my-6 flex justify-between`}>
            <div className='flex items-center md:gap-6 gap-3'>
                <Avatar className={'md:h-16 md:w-16 h-12 w-12'}>
                    <AvatarImage src={space?.image} />
                    <AvatarFallback>{space?.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className='font-bold md:text-xl text-lg md:pb-2 pb-1'>{space?.name}</h3>
                    <div className='flex items-center gap-2 text-muted-foreground hover:underline [w-90%]'>
                        <Link2 className='md:size-6 size-5' />
                        <span className='block sm:hidden text-sm'>{truncatedUrl}</span>
                        <span className='hidden sm:block text-md '>{spaceUrl}</span>
                    </div>
                </div>
            </div>
            <SpaceSettings spaceUrl={spaceUrl} space={space}/>
           
        </div>
    );
};

export default SingleSpace