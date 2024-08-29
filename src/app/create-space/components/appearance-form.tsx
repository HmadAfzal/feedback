import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Loader, Loader2 } from 'lucide-react'
import axios from 'axios'
import { addSpace } from '@/redux/spaceslice'
import { useAppDispatch } from '@/redux/hooks'
import { Session } from '@/schemas/Session'
import { useRouter } from 'next/navigation'

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark"], {
    required_error: "Please select a theme.",
  })
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

const defaultValues: Partial<AppearanceFormValues> = {
  theme: "light",
}

const AppearanceForm = ({setActiveItem,  setFormData, formData, selectedFile,  user}: {setActiveItem: (name: string) => void, setFormData: any, formData: any, selectedFile: any, user:Session}) => {
  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  })
  const [loading, setLoading] = useState(false);
const dispatch=useAppDispatch()
const router=useRouter()
const onSubmit=async(data: AppearanceFormValues)=> {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setLoading(true);
        try {
          let imageUrl = '';
          let publicId = ''; 
      
          if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('upload_preset', 'testimonial');
      
            const response = await fetch(
              `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
              {
                method: 'POST',
                body: formData,
              }
            );
      
            const data = await response.json();
            if (data.secure_url) {
              imageUrl = data.secure_url;
              publicId = data.public_id; 
             
            } else {
              throw new Error('Upload failed');
            }
          }
      
          const response = await axios.post('/api/create-space', {
            userId: user?._id,
            ...formData,
            theme:data.theme,
            image: imageUrl,
            public_id: publicId,
          });
          dispatch(addSpace(response?.data.space));
      
          toast({
            title: 'Success',
            description: response?.data.message,
          });
          router.push('/dashboard')
        } catch (error: any) {
          console.error('Error submitting form:', error);
      
          toast({
            title: 'Error',
            description: error.response?.data?.message || 'An unexpected error occurred',
            variant: 'destructive',
          });
        } finally {
          setLoading(false);
        }
      
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Theme</FormLabel>
                <FormDescription>
                  Select the theme for the dashboard.
                </FormDescription>
                <FormMessage />
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid max-w-md grid-cols-2 gap-8 pt-2"
                >
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="light" className="sr-only" />
                      </FormControl>
                      <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                        <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                          <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                            <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                          </div>
                        </div>
                      </div>
                      <span className="block w-full p-2 text-center font-normal">
                        Light
                      </span>
                    </FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="dark" className="sr-only" />
                      </FormControl>
                      <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                        <div className="space-y-2 rounded-sm bg-neutral-950 p-2">
                          <div className="space-y-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                            <div className="h-2 w-[80px] rounded-lg bg-neutral-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-neutral-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-neutral-800 p-2 shadow-sm">
                            <div className="h-4 w-4 rounded-full bg-neutral-400" />
                            <div className="h-2 w-[100px] rounded-lg bg-neutral-400" />
                          </div>
                        </div>
                      </div>
                      <span className="block w-full p-2 text-center font-normal">
                        Dark
                      </span>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormItem>
            )}
          />
          <div className='flex items-center gap-8'>
          <Button variant={'outline'} className='flex items-center' onClick={()=>setActiveItem('additional')}><ArrowLeft className='size-3 mr-2 ' /> Additional</Button> 
          <Button type="submit" disabled={loading}>{loading?<> <Loader2 className='animate-spin size-4 mr-2'/>  Creating space</> : 'Create space'}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AppearanceForm
