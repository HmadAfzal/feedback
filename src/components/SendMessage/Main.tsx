'use client';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from '../ui/checkbox';
import { Loader2, PenSquareIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Space } from '@/schemas/Space';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Textarea } from '../ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MessageSchema } from '@/schemas/Message';
import CustomUploadButton from '../CustomUploadButton';
import { toast } from '../ui/use-toast';
import axios from 'axios';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hooks';
import { addMessage } from '@/redux/messageslice';

const Main = ({ spaceData }: { spaceData: Space }) => {
    const [imageFile, setImageFile] = useState();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [showFormDialog, setShowFormDialog] = useState(false);
    const [showThankYouDialog, setShowThankYouDialog] = useState(false);
const dispatch=useAppDispatch()
    const form = useForm<z.infer<typeof MessageSchema>>({
        resolver: zodResolver(MessageSchema),
        defaultValues: {
            name: "",
            feedback: "",
            image: "",
            email: ""
        },
    });

    const onSubmit = async (data: z.infer<typeof MessageSchema>) => {
        setLoading(true);
        try {
            let imageUrl = '';
            let publicId='';
            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('upload_preset', 'testimonial');  // create an upload preset and enter it here

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
            if (isCheckboxChecked) {
                const response = await axios.post('/api/send-message', {
                    spaceId: spaceData?._id,
                    ...data,
                    image: imageUrl,
                    publicId:publicId
                });
                dispatch(addMessage(response?.data.newMessage))
                toast({
                    title: 'Success',
                    description: response?.data.message,
                });
                form.reset();
                setShowFormDialog(false);
                setShowThankYouDialog(true); 
            }
        } catch (error: any) {
            console.error('Error submitting form:', error);
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'An unexpected error occurred',
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${spaceData?.isDarkTheme ? 'bg-[#121212] text-white' : 'bg-white text-black'} p-8  min-h-screen flex items-center justify-center`}>
  <div className="w-full max-w-[90%] md:max-w-[70%]">
    <div className="flex flex-col items-center justify-center gap-6 pb-2">
      <Avatar className="h-24 w-24 md:h-36 md:w-36">
        <AvatarImage src={spaceData?.image} />
        <AvatarFallback>img</AvatarFallback>
      </Avatar>

      <h1 className="text-center font-bold text-3xl md:text-4xl lg:text-5xl text-[#EA580C]">
        {spaceData?.title}
      </h1>
      <p className="text-center tracking-wide px-4 md:px-10 text-lg md:text-xl">
        {spaceData?.description}
      </p>
    </div>

    <div className="pt-8 md:pt-12 flex flex-col gap-4 md:gap-6 pb-8 md:pb-12">
      <h3 className="font-semibold text-2xl md:text-3xl">
        Tips to write a <span className="text-[#EA580C]">feedback</span>
      </h3>
      <ul className="list-disc flex flex-col gap-2">
        <li>Clearly identify what you are giving feedback about. Vague comments can be confusing and unhelpful.</li>
        <li>Focus on providing suggestions for improvement rather than just pointing out flaws.</li>
        <li>Base your feedback on observable behavior or specific outcomes rather than personal opinions or feelings.</li>
        <li>Consider the recipient&apos;s feelings and be respectful in your tone.</li>
        <li>If possible, follow up to see how the recipient is progressing and provide additional support or feedback as needed.</li>
      </ul>
    </div>
                <Dialog open={showFormDialog} onOpenChange={(open) => setShowFormDialog(open)}>
                    <DialogTrigger asChild>
                        <Button className='w-full flex items-center gap-3'>
                            <PenSquareIcon size={20} /> {spaceData?.buttonText}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className={`sm:max-w-[425px] border-none ${spaceData?.isDarkTheme ? 'bg-neutral-900 text-white' : 'bg-white text-black'}`}>
                        <DialogHeader>
                            <div className='flex flex-col items-center justify-center gap-2 '>
                                <Avatar className='h-20 w-20'>
                                    <AvatarImage src={spaceData?.image} />
                                    <AvatarFallback>img</AvatarFallback>
                                </Avatar>
                                <DialogTitle className='text-center font-bold text-xl text-[#EA580C]'>{spaceData?.name}</DialogTitle>
                            </div>
                            <DialogDescription className='text-center'>
                                Send feedback to {spaceData?.name}.
                                This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>

                        <div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                                    <FormField control={form.control} name="name" render={({ field }) => (
                                        <FormItem className='pb-2'>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Name" {...field} className='bg-transparent border-neutral-700 focus:border-none' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <div className='flex items-center justify-between pb-2'>
                                        <FormField control={form.control} name="image" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Image (optional)</FormLabel>
                                                <FormControl>
                                                    <div className='flex items-center gap-3 w-full'>
                                                        <Avatar className='h-10 w-10'>
                                                            <AvatarImage src={imageFile} />
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
                                        )} />
                                    </div>
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem className='pb-2'>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Email" {...field} className='bg-transparent border-neutral-700 focus:border-none' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="feedback" render={({ field }) => (
                                        <FormItem className='pb-2'>
                                            <FormLabel>Your custom message</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Message" {...field} className='bg-transparent border-neutral-700 focus:border-none' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <div className="flex items-center space-x-2 pb-4">
                                        <Checkbox
                                            id="terms"
                                            checked={isCheckboxChecked}
                                            onCheckedChange={(checked) => setIsCheckboxChecked(checked === true)}
                                        />
                                        <label htmlFor="terms" className="text-sm font-medium leading-none">
                                            {spaceData?.ConsentStatement}
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Button className='w-full' type="submit" disabled={!isCheckboxChecked || loading}>
                                            {loading ? <Loader2 className='animate-spin' /> : 'Submit Feedback'}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </DialogContent>
                </Dialog>

                <Dialog open={showThankYouDialog} onOpenChange={(open) => setShowThankYouDialog(open)}>
                    <DialogContent className={`sm:max-w-[425px] border-none ${spaceData?.isDarkTheme ? 'bg-neutral-900 text-white' : 'bg-white text-black'}`}>
                        <DialogHeader>
                            <div className='flex w-full items-center justify-center'>
                                <Image src='https://media.giphy.com/media/8qD1FHjc4wllVBL3ln/giphy.gif?cid=ecf05e47gvya2nlu06oll65e05mxeg23paqfdhwynqmzbbyf&ep=v1_gifs_search&rid=giphy.gif&ct=g' alt='img' height={300} width={300} className='rounded-lg'/>
                            </div>
                            <DialogTitle className='text-center font-bold text-xl text-[#EA580C]'>{spaceData?.thankyouPageTitle}</DialogTitle>
                            <DialogDescription className='text-center'>
                               {spaceData?.thankyouPageText}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-center pt-4">
                            <Button onClick={() => setShowThankYouDialog(false)}>
                                Close
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default Main;


//remaining responsiveness
//delete messages and their pictures when space is deleted
//fix edit space error
