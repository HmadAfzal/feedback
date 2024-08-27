import React, { useState } from 'react'
import { Session } from '@/schemas/Session'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Eye, Moon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { SpaceSchema } from '@/schemas/Space';
import FormPreview from './FormPreview';
import CustomUploadButton from '@/components/CustomUploadButton';
import { Button } from '@/components/ui/button';


const CreateSpace = ({ user, setCreateSpace }: { user: Session, setCreateSpace: (value: boolean) => void }) => {

    const [additional, setAdditional] = useState(false);
    const [imageFile, setImageFile] = useState();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState(false);
    const [formData, setFormData] = useState<z.infer<typeof SpaceSchema> | null>(null);

    const form = useForm<z.infer<typeof SpaceSchema>>({
        resolver: zodResolver(SpaceSchema),
        defaultValues: {
            name: "",
            image: "",
            title: "",
            description: "",
            isDarkTheme: true,
            buttonText: 'Send in feedback',
            thankyouPageTitle: "Thank you!",
            thankyouPageText: "Your feedback means a lot to us",
        },
    });

    const onSubmit = async (data: z.infer<typeof SpaceSchema>) => {
console.log(data)
        setFormData(data);
        setPreview(true);
    };
        return (
            <>
            {preview ? (
                <FormPreview formData={formData} selectedFile={selectedFile} setCreateSpace={setCreateSpace} user={user} imageFile={imageFile} setPreview={setPreview} />
            ) : (
                <div className='w-[100%]  py-12 '>

                    <div className='flex flex-col gap-4'>
                        <h1 className='text-center font-bold text-4xl text-[#EA580C]'>Create a new space</h1>
                        <p className='text-center tracking-wide px-10'>
                            After the Space is created, it will generate a dedicated page for collecting feedbacks.
                        </p>
                    </div>
                    <div className='py-8'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                                <div className='flex items-center justify-between pb-4'>
                                    <div className='w-[70%]'>
                                        <FormField control={form.control} name="name" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel >Space Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Name" {...field} className='bg-transparent' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                    <div className='w-[20%]'>
                                        <FormField control={form.control} name="image" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Space Logo</FormLabel>
                                                <FormControl>
                                                    <div className='flex items-center gap-3'>
                                                        <Avatar className='h-10 w-10'>
                                                            <AvatarImage src={imageFile ? imageFile : user?.profilepic} />
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
                                    <FormItem className='pb-4'>
                                        <FormLabel>Header Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Title" {...field} className='bg-transparent' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="description" render={({ field }) => (
                                    <FormItem className='pb-4'>
                                        <FormLabel>Your custom message</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Message" {...field} className='bg-transparent' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <div className='flex items-center justify-between pb-4'>
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
                                                <FormLabel>Button Text</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Text" {...field} className='bg-transparent' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                </div>
                             <p className='text-sm text-[#EA580C] cursor-pointer hover:underline pb-4' onClick={() => setAdditional(!additional)}>
                                    Customize Thank you Page
                                </p>  
                                {additional && (
                                    <>
                                        <FormField control={form.control} name="thankyouPageTitle" render={({ field }) => (
                                            <FormItem className='pb-4'>
                                                <FormLabel>Thank you title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Thank you!" {...field} className='bg-transparent' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="thankyouPageText" render={({ field }) => (
                                            <FormItem className='pb-4'>
                                                <FormLabel >Thank you text</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Thank you so much for your shoutout! It means a ton for us! 🙏" {...field} className='bg-transparent' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </>
                                )}
                                <div className="flex items-center justify-between">
                                    <Button variant={'outline'} onClick={() => setCreateSpace(false)}>Cancel</Button>
                                    <Button className='flex items-center gap-2' type="submit">
                                        <Eye size={18} /> Preview
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                   
                </div>
            )}
        </>
    )
}

export default CreateSpace