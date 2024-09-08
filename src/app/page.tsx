import Features from '@/components/home/Features'
import Footer from '@/components/Footer'
import Hero from '@/components/home/Hero'
import Newsletter from '@/components/home/Newsletter'
import Process from '@/components/home/Process'
import Testimonial from '@/components/home/Testimonial'
import React from 'react'
import Navbar from '@/components/home/Nav'

const page = () => {
  return (

    <div className="flex flex-col items-center w-full">
      <Navbar />
      <section className="w-full relative flex items-center justify-center flex-col px-4 md:px-0 py-8">
        <Hero />
        <Process />
        <Features />
        <Testimonial />
        <Newsletter />
      </section>
      
    </div>

  )
}

export default page


//TODO : make home nav responsive, landing responsive 
//add video
//set spacing (see footer)
//Final testing