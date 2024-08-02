import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Eye, Loader2, PenSquareIcon, Rocket } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { SpaceSchema } from '@/schemas/Space';
import axios from 'axios';
import { toast } from '../ui/use-toast';
import { Session } from '@/schemas/Session';
import { z } from 'zod';

const FormPreview = ({ formData, selectedFile, setCreateSpace, user, imageFile, setPreview }: 
    { 
      formData: z.infer<typeof SpaceSchema> | null, 
      selectedFile: File | null, 
      setCreateSpace: (value: boolean) => void, 
      user: Session, 
      imageFile: string | undefined, 
      setPreview: (value: boolean) => void 
    }) => {
    const [loading, setLoading] = useState(false);
console.log(formData)

    const createSpace = async () => {
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
                ...formData,
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
        <div className='w-[100%] py-8'>
         <div className='flex items-center justify-between pb-8'> 
         <Button onClick={()=>setPreview(false)} variant={'outline'} className='flex items-center gap-2'><ArrowLeft size={14}/> Back</Button>
            <Button onClick={createSpace} disabled={loading} className='flex items-center gap-2' >
                {loading ? <><Loader2 className='animate-spin' size={18}/>Creating</> : <><Rocket size={20}/> Create Space</>}
            </Button>
          
            </div>
        <div className={ 'dark:bg-neutral-800 text-white bg-neutral-100 p-12 rounded-lg shadow-lg overflow-hidden relative'}>
            <div className=' bg-[#EA580C] text-white absolute top-0 left-0 px-4 py-1 text-center flex items-center gap-2 rounded-br-lg'><Eye size={18}/> <p>Live preview</p>
            </div>
            <div className='flex flex-col items-center justify-center gap-4'>
                <Avatar className='h-24 w-24'>
                    <AvatarImage src={imageFile ? imageFile : user?.profilepic} />
                    <AvatarFallback>img</AvatarFallback>
                </Avatar>

                <h1 className='text-center font-bold text-4xl text-[#EA580C]'>{formData?.title}</h1>
                <p className='text-center tracking-wide px-10'>{formData?.description}</p>
            </div>
            <div className='pt-12 flex flex-col gap-4'>
                <h3 className='font-semibold text-xl'>Tips to write a <span className='text-[#EA580C]'>feedback</span></h3>
                <ul className='list-disc'>
                    <li>What was your project about and how did Hmad contribute?</li>
                    <li>How would you rate your overall experience working with Hmad?</li>
                    <li>What specific qualities or skills did Hmad have?</li>
                    <li>Is there anything you think Hmad could improve on in future projects?</li>
                    <li>Would you recommend Hmad to others looking for web development services?</li>
                </ul>
            </div>
            <div className="flex items-center space-x-2 py-8">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm font-medium leading-none">
                    {formData?.ConsentStatement}
                </label>
            </div>
            <Button className='w-full flex items-center gap-3'>
                <PenSquareIcon size={20} /> {formData?.buttonText}
            </Button>
        </div>
        </div>
    );
};

export default FormPreview;
