import Link from 'next/link'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Copy, Link2, Pen, Settings, Trash2Icon } from 'lucide-react'
import { Space } from '@/schemas/Space'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
import { toast } from './ui/use-toast'

const SpaceHeader = ({space, h, w, bg, p}:{space: Space, h:number, w:number, bg:string, p:string}) => {
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    const url=`${baseUrl}/u/${space?.name}`
const handleCopyLink=(event: React.MouseEvent)=>{
    event.stopPropagation();
    navigator.clipboard.writeText(url)
    toast({
        title:'Success',
        description:'Link copied to clipboard',
    })
}
    return (
        <div className={` ${bg} ${p} w-full rounded-lg px-6 my-6 flex justify-between`}>
            <div className='flex items-center gap-6'>
                <Avatar className={`h-${h} w-${w}`}>
                    <AvatarImage src={space?.image} />
                    <AvatarFallback>pf</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className='font-bold text-xl pb-2'>{space?.name}</h3>
                    <div className='flex items-center gap-2 text-md dark:text-neutral-400 text-neutral-700 hover:underline'>
                        <Link2 />
                        <p>{url}</p>
                    </div>
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="link" size="icon" >
                        <div className={`cursor-pointer dark:text-neutral-400 text-neutral-700`}>
                            <Settings size={22} />
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border-none p-2 mx-0">
                    <DropdownMenuItem className='cursor-pointer' onClick={handleCopyLink}>
                         Copy link
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer text-bg-red-500'>
                         Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default SpaceHeader
