import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
;
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import axios from 'axios';
import { useAppDispatch } from '@/redux/hooks';
import { deleteSpace } from '@/redux/spaceslice';
import { Copy, Link2, Loader2, Settings, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation'
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { toast } from './ui/use-toast';
import { Space } from '@/schemas/Space';
const SpaceSettings = ({spaceUrl, space}:{spaceUrl:string, space:Space}) => {

    const dispatch = useAppDispatch();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showCopyLinkDialog, setShowCopyLinkDialog]=useState(false)
    const [loading, setLoading] = useState(false)
const router=useRouter()

    const handleCopyLink = (event: React.MouseEvent) => {
        event.stopPropagation();
        navigator.clipboard.writeText(spaceUrl);
        toast({
            title: 'Success',
            description: 'Link copied to clipboard',
        });
        setShowCopyLinkDialog(false);
    };

    const handleShowDialogue = (event: React.MouseEvent) => {
        event.stopPropagation();
        setShowDeleteDialog(true);
    };

    
    const handleShowCopyLinkDialog = (event: React.MouseEvent) => {
        event.stopPropagation();
        setShowCopyLinkDialog(true);
    };

    const handleDelete = async (event: React.MouseEvent,spaceId: string, publicId: string, owner: string) => {
        event.stopPropagation();

        try {
            setLoading(true)
            if (publicId) {
                await axios.delete('/api/delete-image', {
                    data: { publicId: publicId },
                });
            }

            const response = await axios.delete('/api/delete-space', {
                data: { spaceId, owner },
            });

            dispatch(deleteSpace(spaceId));

            toast({
                title: 'Success',
                description: response?.data.message,
            });
            setShowDeleteDialog(false);
            router.push('/dashboard')
        } catch (error: any) {
            console.log('Error deleting space', error);
            toast({
                title: 'Error',
                description: error.response?.data.message || 'Error deleting space',
            });
        } finally{
            setLoading(false)
        }
    };
  return (

   <>
    <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="link" size="icon">
                        <div className='cursor-pointer text-muted-foreground'>
                            <Settings className='md:size-6 size-5' />
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border-none p-2 mx-0">
                    <DropdownMenuItem className='cursor-pointer' onClick={handleShowCopyLinkDialog}>
                        Copy link
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer text-bg-red-500' onClick={handleShowDialogue}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>



            <Dialog open={showCopyLinkDialog} onOpenChange={(open) => setShowCopyLinkDialog(open)}>
      <DialogContent className="sm:max-w-md border-none" onClick={(event:React.MouseEvent)=>{event.stopPropagation()}}>
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link can send u a feedback.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={spaceUrl}
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3" variant="secondary" onClick={handleCopyLink}>
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
        </DialogFooter>
      </DialogContent>
    </Dialog>




            <Dialog open={showDeleteDialog} onOpenChange={(open) => setShowDeleteDialog(open)}>
                        <DialogContent className="sm:max-w-md border-none" onClick={(event:React.MouseEvent)=>{event.stopPropagation()}}>
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
                                onClick={(event) => handleDelete(event,space?._id, space?.public_id, space?.owner)}
                            >
                              {loading? <><Loader2 className='animate-spin'/></> : <> <Trash2 size={16}/> Delete </> }
                            </Button>
                        </DialogContent>
                    </Dialog>
   </>
  )
}

export default SpaceSettings
