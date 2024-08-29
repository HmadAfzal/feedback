'use client'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import SpaceForm from './space-form'
import { SidebarNav } from './sidebar-nav'
import AdditionalForm from './additional-form'
import AppearanceForm from './appearance-form'

const Main = () => {
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
    <>
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
  </>
  )
}

export default Main
