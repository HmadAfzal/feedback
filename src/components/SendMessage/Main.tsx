import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from '../ui/checkbox'
import { PenSquareIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Space } from '@/schemas/Space'

const Main = ({spaceData}:{spaceData: Space}) => {

  return (
    <div className={`${spaceData?.isDarkTheme ? 'bg-neutral-900' : 'bg-white text-black'} p-12 h-screen px-20 flex items-center justify-center`}>
    <div className=' w-[70%]'>
       <div className='flex flex-col items-center justify-center gap-6 pb-4'>
           <Avatar className='h-36 w-36'>
               <AvatarImage src={spaceData?.image} />
               <AvatarFallback>img</AvatarFallback>
           </Avatar>

           <h1 className='text-center font-bold text-5xl text-[#EA580C]'>{spaceData?.title}</h1>
           <p className='text-center tracking-wide px-10 text-xl'>{spaceData?.description}</p>
       </div>
       <div className='pt-12 flex flex-col gap-6 pb-12'>
           <h3 className='font-semibold text-3xl'>Tips to write a <span className='text-[#EA580C]'>feedback</span></h3>
           <ul className='list-disc flex flex-col gap-2'>
               <li>Clearly identify what you are giving feedback about. Vague comments can be confusing and unhelpful.</li>
               <li>Focus on providing suggestions for improvement rather than just pointing out flaws.</li>
               <li>Base your feedback on observable behavior or specific outcomes rather than personal opinions or feelings.</li>
               <li> Consider the recipient's feelings and be respectful in your tone.</li>
               <li>If possible, follow up to see how the recipient is progressing and provide additional support or feedback as needed.</li>
           </ul>
       </div>
       {/* <div className="flex items-center space-x-2 pt-8 pb-12">
           <Checkbox id="terms" />
           <label htmlFor="terms" className="text-sm font-medium leading-none">
              {spaceData?.ConsentStatement}
           </label>
       </div> */}
       <Button className='w-full flex items-center gap-3'>
           <PenSquareIcon size={20} /> {spaceData?.buttonText}
       </Button>
       </div>
   </div>

  )
}

export default Main
