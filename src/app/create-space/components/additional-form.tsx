"use client"
import { Separator } from '@/components/ui/separator'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from 'lucide-react'

const additionalFormSchema = z.object({
  thankyouPageTitle: z
  .string()
  .min(1, { message: "Thank you page title is required" })
  .max(20, { message: "Title must not be longer than 20 characters.", }),
  thankyouPageText: z
  .string()
  .min(1, { message: "Thank you page text is required" })
  .max(120, { message: "Thankyou must not be longer than 120 characters.", }),
})

const AdditionalForm = ({setActiveItem , setFormData, formData}: {setActiveItem: (name: string) => void, setFormData:any, formData:any}) => {

  type additionalFormValues = z.infer<typeof additionalFormSchema>

const defaultValues: Partial<additionalFormValues> = {
thankyouPageText:formData.thankyouPageText ||"Thanks alot for the feedback it means a alot to us",
thankyouPageTitle:formData.thankyouPageTitle ||"Thank you!"
}


    const form = useForm<additionalFormValues>({
        resolver: zodResolver(additionalFormSchema),
        defaultValues,
      })
    
      function onSubmit(data: z.infer<typeof additionalFormSchema>) {
        setFormData((prev: any) => ({ ...prev, ...data }));
        setActiveItem('appearance')
      }
  return (
    <div>
          <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Additional</h3>
        <p className="text-sm text-muted-foreground">
        Customize your thank you page.
        Add a personal message to show your appreciation.
        </p>
      </div>
      <Separator />
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="thankyouPageTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Thank you!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      
      <FormField
          control={form.control}
          name="thankyouPageText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Thanks alot for the feedback it means a alot to us"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       
        <div className='flex items-center gap-8'>
          <Button variant={'outline'} className='flex items-center' onClick={()=>setActiveItem('space')}><ArrowLeft className='size-3 mr-2 ' />Space</Button> 
          <Button type='submit'>Move to appearance</Button>
          </div>
      </form>
    </Form>
    </div>
    </div>
  )
}

export default AdditionalForm
