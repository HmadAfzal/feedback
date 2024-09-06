import React from 'react';
import { Link2, Pen } from 'lucide-react';
import { Space } from '@/schemas/Space';
import SpaceEdit from './SpaceEdit';
import SpaceSettings from '@/components/SpaceSettings';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

const SpaceHeader = ({ space }: { space: Space }) => {
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    const spaceUrl = `${baseUrl}/u/${space?.name}`;
    const truncatedUrl = spaceUrl.length > 25 ? `${spaceUrl.slice(0, 25)}...` : spaceUrl;

    return (
        <div className={ 'py-2 rounded-lg md:px-6 my-6 w-full flex items-center gap-6'}>
            <Avatar className={'md:h-24 md:w-24 sm:h-16 sm:w-16 h-14 w-14'}>
                <AvatarImage src={space?.image} />
                <AvatarFallback>{space?.name[0]}</AvatarFallback>
            </Avatar>
            <div className='w-full'>
                <div className='flex items-center justify-between'>
                     <h3 className='font-bold md:text-xl text-lg pb-2'>{space?.name}</h3>   
                        <div className='flex gap-1 md:gap-4 items-center text-muted-foreground'>
             <SpaceEdit space={space}/>
           <SpaceSettings space={space} spaceUrl={spaceUrl}/>
       </div> 
                </div>
                <div>
                <Link href={spaceUrl} className='flex items-center gap-2 text-muted-foreground hover:underline [w-90%]'>
                         <Link2 className='md:size-6 size-5' />
                         <span className='block sm:hidden text-sm'>{truncatedUrl}</span>
                      <span className='hidden sm:block text-md '>{spaceUrl}</span>
                     </Link>  
                </div>
            </div>
        </div>
    );
};

export default SpaceHeader