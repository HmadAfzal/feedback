import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PenSquareIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
const FormPreview = () => {
  return (
                  <div className=' w-[40%] dark:bg-neutral-800 bg-neutral-100 p-12 rounded-lg shadow-lg' >
                <div className='flex flex-col items-center justify-center gap-4'>
                    <Avatar className='h-24 w-24'>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>img</AvatarFallback>
                    </Avatar>

                    <h1 className='text-center font-bold text-4xl text-[#EA580C]'>Would you like to give us a shoutout?'</h1>
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
                <Button  className='w-full flex items-center gap-3'><PenSquareIcon size={20}/>Send in feedback</Button>
            </div>

  )
}

export default FormPreview
