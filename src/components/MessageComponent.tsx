import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Loader2, Trash2 } from 'lucide-react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from './ui/button';
import { useAppDispatch } from '@/redux/hooks';
import { deleteMessage } from '@/redux/messageslice';
import { formatTime } from '@/utils/formattime';
import { IoIosArrowDown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Message } from '@/schemas/Message';

const MessageComponent = ({ message,setLikeMessage, likeMessage }: { message: Message, setLikeMessage:(option:boolean)=>void, likeMessage:boolean}) => {
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(message.isLiked);
  const dispatch = useAppDispatch();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    setIsLiked(message.isLiked);
  }, [message.isLiked]);

  const handleMessageLike = async (messageId: string) => {
    try {
      const response = await axios.put('/api/like-message', { messageId });
      console.log(response?.data);
      setIsLiked((prevIsLiked: boolean) => !prevIsLiked);
      setLikeMessage(!likeMessage)
    } catch (error) {
      console.log('Error liking message:', error);
    }
  };

  const handleDeleteMessage = async (messageId: string, publicId: string) => {
    setLoading(true);
    try {
      if (publicId) {
        await axios.delete('/api/delete-image', { data: { publicId } });
      }
      await axios.delete('/api/delete-message', { data: { messageId } });
      dispatch(deleteMessage(messageId));
    } catch (error) {
      console.log('Error deleting message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      key={message._id}
      className="w-full bg-neutral-100 dark:bg-neutral-900 rounded-lg p-6 my-4 shadow-lg"
    >
      <div className="w-full flex items-center justify-between pb-4">
        <div className="flex items-center gap-4">
          {message.image && (
            <Avatar className="h-12 w-12">
              <AvatarImage src={message?.image} />
              <AvatarFallback>pf</AvatarFallback>
            </Avatar>
          )}
          <h3 className="font-semibold text-lg">
            {message?.name}
          </h3>
        </div>
<div className='flex items-center md:gap-3 '>
<Button variant="link" size="icon" onClick={() => handleMessageLike(message?._id)}>
              <Heart className="text-primary md:size-6 size-5" fill={isLiked ? '#EA580C' : 'transparent'}/>
            </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="link" size="icon">
              <IoIosArrowDown className="text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-none p-2 mx-0">
            <DropdownMenuItem
              className="cursor-pointer text-destructive"
              onClick={() => setShowDeleteDialog(true)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
      <div className="py-4 md:w-[80%] sm:w-[90%] w-[95%]">
        <p className='tracking-wide leading-relaxed pb-4 md:text-lg text-sm'>{message?.feedback}</p>
      </div>
      <div className="w-full flex md:flex-row flex-col gap-3 items-start justify-between text-sm">
        <p className="font-semibold">
          Email:{' '}
          <span className="font-medium text-muted-foreground">{message?.email}</span>
        </p>
        <p className="font-semibold">
          Submitted At:{' '}
          <span className="font-medium text-muted-foreground">
            {formatTime(message?.createdAt)}
          </span>
        </p>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={(open) => setShowDeleteDialog(open)}>
        <DialogContent
          className="sm:max-w-md border-none rounded-lg"
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();
          }}
        >
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              Once deleted, it cannot be retrieved.
            </DialogDescription>
          </DialogHeader>
          <Button
            type="button"
            size="sm"
            className="px-3 flex items-center gap-2"
            onClick={() => handleDeleteMessage(message?._id, message?.public_id)}
          >
            {loading ? <Loader2 className="animate-spin" /> : <> <Trash2 size={16} /> Delete</>}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageComponent;
