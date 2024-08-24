import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link2, Pen } from 'lucide-react';
import { Space } from '@/schemas/Space';
import SpaceSettings from './SpaceSettings';
import { Button } from './ui/button';

const SpaceHeader = ({space, setEditSpace}: {space: Space, setEditSpace:(setEditSpace:boolean)=>void}) => {
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    const spaceUrl = `${baseUrl}/u/${space?.name}`;
    const truncatedUrl = spaceUrl.length > 20 ? `${spaceUrl.slice(0, 20)}...` : spaceUrl;

    return (
        <div className={'py-2 w-full rounded-lg md:px-6 my-6 flex items-center justify-between'}>
            <div className='flex items-center md:gap-6 gap-4'>
                <Avatar className={'md:h-24 md:w-24 sm:h-16 sm:w-16 h-14 w-14'}>
                    <AvatarImage src={space?.image} />
                    <AvatarFallback>pf</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className='font-bold md:text-xl text-lg pb-2'>{space?.name}</h3>
                    <div className='flex items-center gap-2 text-muted-foreground hover:underline [w-90%]'>
                        <Link2 className='md:size-6 size-5' />
                        <span className='block sm:hidden text-sm'>{truncatedUrl}</span>
                        <span className='hidden sm:block text-md '>{spaceUrl}</span>
                    </div>
                </div>
            </div>
            <div className='flex gap-4 items-center text-muted-foreground'>
            <Button className=' md:flex items-center gap-3 hidden' onClick={() => setEditSpace(true)}>
                 <Pen className='md:size-6 size-5'/>Edit Space
                </Button>
                
                <Pen className='md:size-6 size-5 block md:hidden cursor-pointer' onClick={() => setEditSpace(true)} />
          <SpaceSettings space={space} spaceUrl={spaceUrl}/>
          </div>
        </div>
    );
};

export default SpaceHeader