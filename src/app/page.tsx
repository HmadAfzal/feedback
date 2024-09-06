import Container from '@/components/home/Container'
import Features from '@/components/home/Features'
import Footer from '@/components/home/Footer'
import Hero from '@/components/home/Hero'
import Navbar from '@/components/home/Nav'
import Newsletter from '@/components/home/Newsletter'
import Pricing from '@/components/home/Pricing'
import Process from '@/components/home/Process'
import SectionBadge from '@/components/home/section-badge'
import Testimonial from '@/components/home/Testimonial'
import Wrapper from '@/components/home/Wrapper'
import { perks } from '@/constants'
import { cn } from '@/lib/utils'
import React from 'react'

const page = () => {
  return (

    <div className="flex flex-col items-center w-full">
      <Navbar />
      <section className="w-full relative flex items-center justify-center flex-col px-4 md:px-0 py-8">
        <Hero />
        <Process />
        <Features />
        <Pricing />
        <Testimonial />
        <Newsletter />
      </section>
      <Footer />
    </div>

  )
}

export default page
