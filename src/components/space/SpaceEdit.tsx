import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from '@/utils/useMediaQuery';
import { Space, EditSpaceSchema } from '@/schemas/Space';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import CustomUploadButton from '../CustomUploadButton';
import axios from 'axios';
import { useAppDispatch } from '@/redux/hooks';
import { selectSpaces } from '@/redux/spaceslice';
import { toast } from '../ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Textarea } from '../ui/textarea';

const SpaceEdit = ({ space }: { space: Space }) => {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [imageFile, setImageFile] = useState<string | undefined>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false)
    const user = session?.user
    const dispatch = useAppDispatch()
    const router=useRouter();

    const form = useForm<z.infer<typeof EditSpaceSchema>>({
        resolver: zodResolver(EditSpaceSchema),
        defaultValues: {
            name: space?.name,
            image: space?.image,
            title: space?.title,
            description: space?.description,
        },
    });

    const onSubmit = async (data: z.infer<typeof EditSpaceSchema>) => {

        setLoading(true);
        try {
            if (selectedFile && space.public_id) {
                await axios.delete('/api/delete-image', {
                    data: { publicId: space.public_id },
                });
            }

            let imageUrl = '';
            let publicId = '';
            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('upload_preset', 'testimonial');

                const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                if (data.secure_url) {
                    imageUrl = data.secure_url;
                    publicId = data.public_id;
                } else {
                    throw new Error('Upload failed');
                }
            }

            const response = await axios.put('/api/edit-space', {
                userId: user?._id,
                ...data,
                image: imageUrl,
                publicId: publicId,
                spaceId:space._id
            });
            if (response.status === 200) {
                const spacesResponse = await axios.get('/api/get-spaces');
                dispatch(selectSpaces(spacesResponse?.data.spaces));
            }
            router.push(`/space/${data?.name}`);
            toast({
                title: 'Success',
                description: response?.data.message,
            });

        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'An unexpected error occurred',
                variant: 'destructive'
            });
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] border-none">
                    <DialogHeader>
                        <DialogTitle>Edit space</DialogTitle>
                        <DialogDescription>
                            Make changes to your space here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <ProfileForm
                        form={form}
                        onSubmit={onSubmit}
                        imageFile={imageFile}
                        setSelectedFile={setSelectedFile}
                        setImageFile={setImageFile}
                        space={space}
                        loading={loading}
                    />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DrawerTrigger>
            <DrawerContent className="border-none">
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit space</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your space here. Click save when you&apos;re done.
                    </DrawerDescription>
                </DrawerHeader>
                <ProfileForm
                    className="px-4"
                    form={form}
                    onSubmit={onSubmit}
                    imageFile={imageFile}
                    setSelectedFile={setSelectedFile}
                    setImageFile={setImageFile}
                    space={space}
                    loading={loading}
                />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

function ProfileForm({
    className,
    form,
    onSubmit,
    imageFile,
    setSelectedFile,
    setImageFile,
    space,
    loading
}: {
    className?: string;
    form: UseFormReturn<z.infer<typeof EditSpaceSchema>>;
    onSubmit: (data: z.infer<typeof EditSpaceSchema>) => void;
    imageFile: string | undefined;
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
    setImageFile: React.Dispatch<React.SetStateAction<string | undefined>>;
    space: Space;
    loading:boolean
}) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-6", className)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Space Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Space Logo</FormLabel>
                            <FormControl>
                                <div className='flex items-center gap-3'>
                                    <Avatar className='h-10 w-10'>
                                        <AvatarImage src={imageFile || space?.image} />
                                        <AvatarFallback>img</AvatarFallback>
                                    </Avatar>
                                    <CustomUploadButton
                                        setSelectedFile={setSelectedFile}
                                        setLocalAvatarUrl={setImageFile}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Space Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='w-full' disabled={loading}>{loading ?<div className='flex  items-center gap-2'><Loader2 className='animate-spin size-4'/>Saving </div> : 'Save'}</Button>
            </form>
        </Form>
    );
}

export default SpaceEdit;
