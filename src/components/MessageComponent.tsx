import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Delete, Heart, Loader2, Trash2 } from 'lucide-react'
import { Message } from '@/schemas/Message'
import axios from 'axios'
import { Space } from '@/schemas/Space'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from './ui/button'

const MessageComponent = ({ message, space }: { message: Message, space: Space }) => {
  const [loading, setLoading] = useState(false)

    const handleMessageLike = async (messageId: string) => {
        try {
            const response = await axios.put('/api/like-message', {
                messageId: messageId
            })
            console.log(response?.data)
        } catch (error: any) {
            console.log('error liking post: ', error)
        }
    }


    const handleDeleteMessage = async (messageId: string,publicId: string) => {
      setLoading(true)
      try {
        if (publicId) {
          await axios.delete('/api/delete-image', {
              data: { publicId: publicId },
          });
      }
          const response = await axios.delete('/api/delete-message', {
              data: { messageId }
          });
          console.log(response?.data);
      } catch (error: any) {
          console.log('error deleting post: ', error);
      }finally{
        setLoading(false)
      }
  };

    return (
        <div key={message._id} className='w-full dark:bg-neutral-800 bg-neutral-200 rounded-lg p-8 my-4'>
            <div className='w-full flex items-center justify-between pb-4'>
                <div className='flex items-center gap-3'>
                    {message.image && (
                        <Avatar className='h-12 w-12'>
                            <AvatarImage src={message?.image} />
                            <AvatarFallback>pf</AvatarFallback>
                        </Avatar>
                    )}
                    <h3 className='font-bold'>{message?.name}</h3>
                </div>
                <div className=' flex items-center gap-4'>
                <div onClick={() => handleMessageLike(message._id)}>
                   {
                    message.isLiked==true ? <Heart size={24} fill='red'  className='cursor-pointer text-[#FF0000]' /> 
                    :  <Heart size={24}   className='cursor-pointer' />
                   } 
                </div>
                <Dialog>
                <DialogTrigger asChild>
                <div className='cursor-pointer'><Trash2 size={24} color='red' /></div>
      </DialogTrigger>
                        <DialogContent className="sm:max-w-md border-none">
                            <DialogHeader>
                                <DialogTitle>Are you sure?</DialogTitle>
                                <DialogDescription>
                                    Once deleted it cannot be retrieved
                                </DialogDescription>
                            </DialogHeader>
                            <Button
                                type="button"
                                size="sm"
                                className="px-3 flex items-center gap-2"
                                onClick={() => handleDeleteMessage(message._id,message?.public_id)}
                            >
                              {loading? <><Loader2 className='animate-spin'/></> : <> <Trash2 size={16}/> Delete </> }
                            </Button>
                        </DialogContent>
                    </Dialog>



                </div>
            </div>
            <div>
                <p className='tracking-wide leading-7 pb-4 w-[90%]'>{message?.feedback}</p>
            </div>
            <div>
                <p className='font-semibold pb-1'>Email: <span className='font-normal dark:text-neutral-300 text-neutral-800'>{message?.email}</span></p>
                <p className='font-semibold'>Submitted At: <span className='font-normal dark:text-neutral-300 text-neutral-800'>{message?.createdAt}</span></p>
            </div>
        </div>
    )
}

export default MessageComponent
