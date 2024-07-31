import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Moon } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { useForm } from 'react-hook-form'
import CustomUploadButton from '../CustomUploadButton'
import { SpaceSchema } from '@/schemas/Space'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Session } from '@/schemas/Session'
import axios from 'axios'
import { toast } from '../ui/use-toast'

const CreateSpaceForm = ({ user, setCreateSpace, }: { user: Session, setCreateSpace: (value: boolean) => void }) => {
    const [additional, setAdditional] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const form = useForm<z.infer<typeof SpaceSchema>>({
        resolver: zodResolver(SpaceSchema),
        defaultValues: {
            name: "",
            image: "",
            title: "",
            description: "",
            isDarkTheme: true,
            buttonText: 'Send in feedback',
            ConsentStatement: 'I give permission to use this feedback',
            thankyouPageTitle: "Thankyou 🧡",
            thankyouPageText: "Your feedback means a lot to us",
        },
    });

    const onSubmit = async (data: z.infer<typeof SpaceSchema>) => {
        setLoading(true);

        try {
            let imageUrl = '';
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
                } else {
                    throw new Error('Upload failed');
                }
            }

            const response = await axios.post('/api/create-space', {
                userId: user?.providerAccountId,
                ...data,
                image: imageUrl
            });
            setCreateSpace(false);
            toast({
                title: 'Success',
                description: response?.data.message,
            });

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
        <div className='w-[60%]'>
            <div className='flex flex-col gap-4'>
                <h1 className='text-center font-bold text-4xl text-[#EA580C]'>Create a new space</h1>
                <p className='text-center tracking-wide px-10'>After the Space is created, it will generate a dedicated page for collecting feedbacks.</p>
            </div>
            <div className='py-8'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                        <div className='flex items-center justify-between pb-2'>
                            <div className='w-[60%]'>
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-sm'>Space Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name" {...field} className='bg-transparent' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                            <div className='w-[30%]'>
                                <FormField control={form.control} name="image" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-sm'>Space Logo</FormLabel>
                                        <FormControl>
                                            <div className='flex items-center gap-3'>
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
                        </div>
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem className='pb-2'>
                                <FormLabel className='text-sm'>Header Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Title" {...field} className='bg-transparent' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem className='pb-2'>
                                <FormLabel className='text-sm'>Your custom message</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Message" {...field} className='bg-transparent' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <div className='flex items-center justify-between pb-2'>
                            <div className='w-[30%]'>
                                <FormField control={form.control} name="isDarkTheme" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Color Mode</FormLabel>
                                        <div className="flex items-center space-x-4 rounded-md border dark:border-neutral-800 p-4">
                                            <Moon />
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium leading-none">Dark Mode</p>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                            <div className='w-[60%]'>
                                <FormField control={form.control} name="buttonText" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-sm'>Button Text</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Text" {...field} className='bg-transparent' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        </div>
                        <FormField control={form.control} name="ConsentStatement" render={({ field }) => (
                            <FormItem className='pb-2'>
                                <FormLabel className='text-sm'>Consent statement</FormLabel>
                                <FormControl>
                                    <Input placeholder="Statement" {...field} className='bg-transparent' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <p className='text-sm text-[#EA580C] cursor-pointer hover:underline pb-2' onClick={() => setAdditional(!additional)}>Customize Thankyou Page</p>
                        {additional && <>
                            <FormField control={form.control} name="thankyouPageTitle" render={({ field }) => (
                                <FormItem className='pb-2'>
                                    <FormLabel className='text-sm'>Thank you title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Thankyou!" {...field} className='bg-transparent' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="thankyouPageText" render={({ field }) => (
                                <FormItem className='pb-2'>
                                    <FormLabel className='text-sm'>Thank you text</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Thank you so much for your shoutout! It means a ton for us! 🙏" {...field} className='bg-transparent' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </>}

                        <div className="flex items-center justify-between">
                            <Button variant={'outline'} onClick={() => setCreateSpace(false)}>Cancel</Button>
                            <Button type='submit' disabled={loading} className='flex items-center gap-2'>
                                {loading ? <> <Loader2 className='animate-spin' />Creating space</> : 'Create Space'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default CreateSpaceForm;
