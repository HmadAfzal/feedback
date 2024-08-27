'use client'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { SidebarNav } from './components/sidebar-nav'
import SpaceForm from './components/space-form'
import AdditionalForm from './components/additional-form'
import AppearanceForm from './components/appearance-form'
import { useSession } from 'next-auth/react'

const page = () => {
  const { data: session, status } = useSession();
  const [activeItem, setActiveItem] = useState('space');
  const [image, setImage]=useState()
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    title: "",
    description: "",
    isDarkTheme: '',
    buttonText: '',
    thankyouPageTitle: "",
    thankyouPageText: "",
  });

  return (
    <div className="space-y-6 p-10 pb-16 ">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Create space</h2>
          <p className="text-muted-foreground">
            Create a space and set other preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav activeItem={activeItem}/>
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            {
             activeItem =='space'?  <SpaceForm setActiveItem={setActiveItem} user={session?.user} setFormData={setFormData} formData={formData} setImage={setImage}/> : (activeItem=='additional' ? <AdditionalForm setActiveItem={setActiveItem}   setFormData={setFormData} formData={formData}/> : <AppearanceForm setActiveItem={setActiveItem} setFormData={setFormData} formData={formData} selectedFile={image} user={session?.user}/>)
            }
         
          </div>
        </div>
      </div>
  )
}

export default page