import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Eye, Loader2, PenSquareIcon, Rocket } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Space, SpaceSchema } from '@/schemas/Space';
import axios from 'axios';
import { toast } from '../ui/use-toast';
import { Session } from '@/schemas/Session';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addSpace, getSpaces, selectSpaces } from '@/redux/spaceslice';
import { useRouter } from 'next/navigation';

type EditSpacePreviewProps = {
  formData: z.infer<typeof SpaceSchema> | null;
  selectedFile: File | null;
  setEditSpace: (value: boolean) => void;
  user: Session;
  imageFile: string | undefined;
  setPreview: (value: boolean) => void;
  space:Space
};

const EditSpacePreview: React.FC<EditSpacePreviewProps> = ({
  formData,
  selectedFile,
  setEditSpace,
  user,
  imageFile,
  setPreview, 
  space
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router=useRouter();

  const editSpace = async () => {
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
            ...formData, 
            image: imageUrl,
            publicId: publicId,
        });

        if (response.status === 200) {
            const spacesResponse = await axios.get('/api/get-spaces');
            dispatch(selectSpaces(spacesResponse?.data.spaces));
        }

        toast({
            title: 'Success',
            description: response?.data.message,
        });
        setEditSpace(false);
        router.push(`/space/${formData?.name}`);
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


  return (
    <div className="w-full py-8 px-4 md:px-8 lg:px-12">
    <div className="flex flex-row items-center justify-between pb-8 gap-4">
      <Button
        onClick={() => setPreview(false)}
        variant="outline"
        className="flex items-center gap-2"
      >
        <ArrowLeft size={14} /> Back
      </Button>
      <Button
        onClick={editSpace}
        disabled={loading}
        className="flex items-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} /> Editing
          </>
        ) : (
          <>
            <Rocket className='md:size-6 size-4'/> Save
          </>
        )}
      </Button>
    </div>
  
    <div className="dark:bg-neutral-800 dark:text-white bg-neutral-100 text-black p-8 md:p-12 rounded-lg shadow-lg overflow-hidden relative">
      <div className="bg-[#EA580C] text-foreground absolute top-0 left-0 px-2 md:px-4 py-1 text-center flex items-center gap-2 rounded-br-lg">
        <Eye className='md:size-6 size-4' />
        <p className='md:text-md text-sm'>Live preview</p>
      </div>
  
      <div className="flex flex-col items-center justify-center gap-4">
        <Avatar className="h-20 w-20 md:h-24 md:w-24">
          <AvatarImage src={imageFile ? imageFile : formData?.image} />
          <AvatarFallback>img</AvatarFallback>
        </Avatar>
  
        <h1 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl text-[#EA580C]">
          {formData?.title}
        </h1>
        <p className="text-center tracking-wide px-4 md:px-8 lg:px-10">
          {formData?.description}
        </p>
      </div>
  
      <div className="pt-8 md:pt-12 flex flex-col gap-4">
        <h3 className="font-semibold text-lg md:text-xl">
          Tips to write a <span className="text-[#EA580C]">feedback</span>
        </h3>
        <ul className="list-disc px-4 md:px-8">
          <li>
            Clearly identify what you are giving feedback about. Vague comments
            can be confusing and unhelpful.
          </li>
          <li>
            Focus on providing suggestions for improvement rather than just
            pointing out flaws.
          </li>
          <li>
            Base your feedback on observable behavior or specific outcomes rather
            than personal opinions or feelings.
          </li>
          <li>
            Consider the recipient's feelings and be respectful in your tone.
          </li>
          <li>
            If possible, follow up to see how the recipient is progressing and
            provide additional support or feedback as needed.
          </li>
        </ul>
      </div>
  
      <div className="flex items-center space-x-2 py-8">
        <Checkbox id="terms" />
        <label htmlFor="terms" className="text-sm font-medium leading-none">
          {formData?.ConsentStatement}
        </label>
      </div>
  
      <Button className="w-full flex items-center gap-3">
        <PenSquareIcon size={20} /> {formData?.buttonText}
      </Button>
    </div>
  </div>
  
  );
};

export default EditSpacePreview;
