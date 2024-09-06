'use client'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import CustomUploadButton from '@/components/CustomUploadButton'
import { Session } from '@/schemas/Session'

const spaceFormSchema = z.object({
  image: z.string(),
  name: z
    .string()
    .regex(/^[a-z0-9]+$/, { message: 'Only characters from a-z and numbers from 0-9 are allowed' })
    .min(2, { message: "Name must be at least 2 characters.", })
    .max(30, { message: "Name must not be longer than 30 characters.", }),
    title: z
    .string()
    .min(1, { message: "Title is Required" })
    .max(120, { message: "Title must not be longer than 120 characters." }),
  description: z
    .string()
    .min(1, { message: "Description is Required" })
    .max(200, {
      message: "description must not be longer than 200 characters.",
    }),
  buttonText: z
    .string()
    .min(1, { message: "Button text is required" })
    .max(30, { message: "Button text must not be longer than 30 characters." }),
})

type spaceFormValues = z.infer<typeof spaceFormSchema>
const baseUrl = `${window.location.protocol}//${window.location.host}`;
const SpaceForm = ({ setActiveItem, user, setFormData, formData , setImage}: { setActiveItem: (name: string) => void, user:Session,  setFormData:any, formData:any, setImage:any }) => {
  const [imageFile, setImageFile] = useState();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const defaultValues: Partial<spaceFormValues> = {
      image:formData.image || "",
      name:formData.name|| "",
      title: formData.title|| "",
      description:formData.description||  "",
      buttonText: formData.buttonText || 'Send in feedback',
    }

    
  const form = useForm<z.infer<typeof spaceFormSchema>>({
    resolver: zodResolver(spaceFormSchema),
    defaultValues,

  })


  function onSubmit(data: z.infer<typeof spaceFormSchema>) {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setImage(selectedFile)
    setActiveItem('additional')

  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Space</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see your space.
        </p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <FormField control={form.control} name="image" render={({ field }) => (
            <FormItem>
              <FormLabel>Space Logo</FormLabel>
              <FormControl>
                <div className='flex items-center gap-3'>
                  <Avatar className='h-10 w-10'>
                    <AvatarImage src={imageFile ? imageFile : user?.profilepic} />
                    <AvatarFallback>{user?.name[0]}</AvatarFallback>
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


          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="feedback" {...field} />
                </FormControl>
                <FormDescription>
                Public URL will be: {baseUrl}/your-space-name.
                </FormDescription>
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
                  <Input placeholder="Would you like to give us a shoutout?" {...field} />
                </FormControl>
                <FormDescription>
       Max chars: 30
      </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write a warm message for your customers and give them simple directions on how you'd like the feedback to be."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
       Max chars: 120
      </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="buttonText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Button text</FormLabel>
                <FormControl>
                  <Input placeholder="Send in feedback" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Next </Button>
        </form>
      </Form>
    </div>
  )
}

export default SpaceForm
