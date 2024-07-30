import React, { useState } from 'react'
import { Separator } from '../ui/separator'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Moon, PenSquareIcon } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"


const CreateSpace = ({ setCreateSpace }: { setCreateSpace: (value: boolean) => void }) => {
    const [additional, setAdditional] = useState(false);
    const form = useForm();
    const onSubmit = (data: any) => {
        console.log(data)
    }
    return (
        <div className='flex w-full py-14 gap-32'>
            <div className=' w-[60%] '>
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
                                        <FormItem >
                                            <FormLabel className='text-sm'>Space Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Name" {...field} className='bg-transparent' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                                <div className='w-[30%]'>
                                    <FormField control={form.control} name="name" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-sm'>Space Logo</FormLabel>
                                            <FormControl>
                                                <div className='flex items-center gap-3'>
                                                    <Avatar className='h-10 w-10'>
                                                        <AvatarImage src="https://github.com/shadcn.png" />
                                                        <AvatarFallback>img</AvatarFallback>
                                                    </Avatar>
                                                    <Button> change logo</Button></div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                            </div>
                            <FormField control={form.control} name="title" render={({ field }) => (
                                <FormItem className='pb-2' >
                                    <FormLabel className='text-sm'>Header Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Title" {...field} className='bg-transparent' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="description" render={({ field }) => (
                                <FormItem className='pb-2' >
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
                                            <FormLabel>Dark Mode</FormLabel>
                                            <div className="flex items-center space-x-4 rounded-md py-2">
                                                <Moon />
                                                <FormControl>
                                                    <Switch />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>)} />
                                </div>
                                <div className='w-[60%]'>
                                    <FormField control={form.control} name="buttontext" render={({ field }) => (
                                        <FormItem >
                                            <FormLabel className='text-sm'>Button Text</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Text" {...field} className='bg-transparent' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                            </div>
                            <FormField control={form.control} name="Consentstatement" render={({ field }) => (
                                <FormItem className='pb-2' >
                                    <FormLabel className='text-sm'>Consent statement</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Statement" {...field} className='bg-transparent' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <p className='text-sm text-[#EA580C] cursor-pointer hover:underline pb-2' onClick={()=>setAdditional(!additional)}>Customize Thankyou Page</p> 
                           {
                                additional && <>
                                <FormField control={form.control} name="thankyoupagetitle" render={({ field }) => (
                                <FormItem className='pb-2' >
                                    <FormLabel className='text-sm'>  Thank you title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Thankyou!" {...field} className='bg-transparent' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

<FormField control={form.control} name="thankyoupagetext" render={({ field }) => (
                                <FormItem className='pb-2' >
                                    <FormLabel className='text-sm'>  Thank you text</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Thank you so much for your shoutout! It means a ton for us! 🙏" {...field} className='bg-transparent' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                                
                                </> 
                            }

                            <div className="flex items-center justify-between">
                                <Button variant={'outline'} onClick={() => setCreateSpace(false)}>Cancel</Button>
                                <Button type='submit'>Create Space</Button>
                            </div>

                         
                        </form>
                    </Form>
                </div>

            </div>


            <div className=' w-[40%] bg-neutral-800 p-12 rounded-lg' >
                <div className='flex flex-col items-center justify-center gap-4'>
                    <Avatar className='h-24 w-24'>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>img</AvatarFallback>
                    </Avatar>

                    <h1 className='text-center font-bold text-4xl text-[#EA580C]'>Would you like to give us a shoutout?</h1>
                    <p className='text-center tracking-wide px-10'>We appreciate your feedback! Please take a moment to share your thoughts about working with Hmad. Your insights will help others make informed decisions.</p>
                </div>
                <div className='pt-12 flex flex-col gap-4'>
                    <h3 className='font-semibold text-xl'>Tips to write a <span className='text-[#EA580C]'>feedback</span></h3>
                    <ul className='list-disc'>
                        <li>What was your project about and how did Hmad contribute?
                        </li>
                        <li>How would you rate your overall experience working with Hmad?</li>
                        <li>What specific qualities or skills did Hmad have?</li>
                        <li>Is there anything you think Hmad could improve on in future projects?</li>
                        <li>Would you recommend Hmad to others looking for web development services?</li>
                    </ul>
                </div>
                <div className="flex items-center space-x-2 py-8">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none">
        Accept terms and conditions
      </label>
    </div>
                <Button className='w-full flex items-center gap-3'><PenSquareIcon size={20}/>Send in feedback</Button>
            </div>
        </div>
    )
}

export default CreateSpace
